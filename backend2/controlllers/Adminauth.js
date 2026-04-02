import { AdminModel } from "../models/admin.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userModel } from "../models/user.model.js"
import { uploadCloudinary } from "../utils/Uploadfiles.js"
import { ProductModel } from "../models/Product.model.js"
import { Order } from "../models/order.model.js"

export const RegisterAdmin = async (req, res) => {
    try {
        
        const { firstname, lastname, phoneNumber, username, age, email, password, confirm_password } = req.body
        if(!firstname || !lastname || !phoneNumber || !username || !age || !email || !password || !confirm_password){
            return res.status(400).json({
                message:"First fill all the details"
            })
        }
        const adminCount = await AdminModel.countDocuments();

        if (adminCount >= 2) {
            return res.status(400).json({
                message: "Admin Full!! You cannot add new Admin"
            });
        }

        const ExistingAdmin = await AdminModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (ExistingAdmin) {
            return res.status(400).json({
                message: "Admin already exists with this email or username"
            });
        }


        if (password !== confirm_password) {
            return res.status(400).json({
                message: "Password must be same"
            })
        }
        const EmailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if (!EmailRegex.test(email)) {
            return res.status(400).json({
                message: "Enter Valid email"
            })
        }

        if (!PasswordRegex.test(password)) {
           return res.status(400).json({
                message: "Password must contain uppercase, lowercase, number, and special character"
            })
        }
        if (age <= 20) {
           return res.status(400).json({
                message: "Age must be greater then 20"
            })
        }

        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/
        if (!usernameRegex.test(username)) {
         return  res.status(400).json({
                message: "Enter valid username"
            })
        }
        const avatarpath = req.files?.avatar?.[0]?.path || "";
        const coverImgpath= req.files?.coverImg?.[0]?.path || "";
        if(!avatarpath){
            return res.status(400).json({
                message:"Avatar file is required"
            })
        }
        
       const avatar= await uploadCloudinary(avatarpath)
       if(!avatar){
        return res.status(400).json({
            message:"Avatar was not uploaded"
        })
       }
       let coverImg=null
        await uploadCloudinary(coverImgpath)
        if(coverImgpath){
        await uploadCloudinary(coverImgpath)}

        const hash = await bcrypt.hash(password, 10)
        const createadmin = await AdminModel.create({
            firstname:firstname.trim(),
            lastname:lastname.trim(),
            phoneNumber,
            age:Number(age),
            email:email.trim(),
            password: hash,
            username:username.trim(),
            avatar:avatar.secure_url,
            coverImg:coverImg?.secure_url || ""
        })


        res.status(201).json({
            message: "Admin registered successfully",
            user: createadmin
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Admin Register Fail",
            error: error.message
        })
        

    }
}

export const LoginAdmin = async (req, res) => {
    try {
        
        const { identifier, password } = req.body

        if (!identifier) {
           return res.status(404).json({
                message: "Enter atleast valid username or email"
            })
        }

        const admin = await AdminModel.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        })
        
        if (!admin) {
           return res.status(404).json({
                message: "Enter valid Data"
            })
        }
        const passverify = await bcrypt.compare(password, admin.password)
        if (!passverify) {
            return res.status(404).json({
                message: "Enter the Correct Password"
            })
        }        

        const accessToken =await admin.generateAccessToken("60m")
        
        await admin.save({ validateBeforeSave: false })
        
        const option = {
            httpOnly: true,
            secure: false
        }

        res
            .status(200)
            .cookie("accessToken", accessToken, option)
          .json({
                message: "Admin login Successfully",
                accessToken,
                admin
            })
    } catch (error) {        
            res.status(404).json({
                message:"Login Failed",
                error:error.message
            })
    }
}

export const GetAdmin=async(req,res)=>{
    try {
        const admin=await AdminModel.findOne(req.admin._id).select("-password -otp")        
        res.status(200).json({
            message:"Admin details",
            admin
        })
    } catch (error) {
        res.status(400).json({
            message:"Servver Errroor",error
        })
    }
}
export const AdminLogout = async (req, res) => {
    try {

        const adminId = req.admin._id;

        await AdminModel.findByIdAndUpdate(
            adminId,
        );

        const options = {
            httpOnly: true,
            secure: true
        };

        res
            .status(200)
            .clearCookie("accessToken", options)
            .json({
                message: "Admin logged out successfully"
            });

    } catch (error) {

        res.status(500).json({
            message: "Logout failed",
            error: error.message
        });

    }
};

export const Forgetpassword = async (req, res) => {

    try {
        const { identity } = req.body
        
        if (!identity) {
            res.status(400).json({
                message: "Enter the Email or Username"
            })
        }

        const admin = await AdminModel.findOne({
            $or: [
                { email: identity },
                { username: identity }
            ]
        })

        if (!admin) {
            res.status(404).json({
                message: "Enter a valid Username or Email"
            })
        }
        
        const token = await admin.generateAccessToken("2m")
        
        const otp=Math.floor(1000+Math.random()*9000).toString()        
        const otpencrpyt=await bcrypt.hash(otp,5)
        admin.otp=otpencrpyt
        await admin.save()
        
        const link=`http://localhost:5173/change-password/${token}`

        res.status(200).json({
            message: "Click on the link button",
            link,
            otp
        });

    } catch (error) {

        res.status(500).json({
            link,
            message: "Forgot password failed",
            error: error.message
        });

    }
};

export const ResetPassowrd = async (req, res) => {
    try {
        
        const { token } = req.params

        const { password, confirm_password } = req.body
        if (  !password || !confirm_password) {
           return res.status(400).json({
                message: "Enter the All data"
            })
        }
        if(password !== confirm_password){
            return res.status(404).json({
                message:"Password Should be same"
            })
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        const admin = await AdminModel.findById(decoded.id)
        if (!admin) {
           return res.status(400).json({
                message: "Unthorized admin"
            })
        }
        
        
        const Same = await bcrypt.compare(password, admin.password)
        
        if (Same) {
          return res.status(404).json({
                message: "New password cannot be same as old password"
            })
        }
        const changepass =await bcrypt.hash(password, 10)
        admin.password = changepass
        await admin.save() 
        return res.status(200).json({
            message: " Password Changed Successfully.."
        })
    } catch (error) {
        console.log(error);
        
        return res.status(401).json({
            message: "Reset password Failed OR token Expire",
            role:req.role
        })
    }

}

export const ChangeCurrentPassword = async (req, res) => {

    try {
        const { oldpassword, newpassword,confirm_password } = req.body
        if (!oldpassword || !newpassword) {
            res.status(404).json({
                message: "First Filled  the  Data"
            })
        }
        if(newpassword !== confirm_password){
            res.status(404).json({
                message:"Password do not match"
            })
        }
        const admin = await AdminModel.findOne(req.admin?._id)
        if (!admin) {
            res.status(404).json({
                message: "User not Found"
            })
        }

        const isPassword = bcrypt.compare(oldpassword, admin.password)
        if (!isPassword) {
            res.status(404).json({
                message: "Password is not Correct"
            })
        }
        const newpasswordhash = await bcrypt.hash(newpassword, 10)
        admin.password = newpasswordhash
        await admin.save()

        return res.status(200).json({
            message: "Password changed successfully"
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message: "Server error",
            error: error.message
        })

    }
}

export const UpdateData = async (req, res) => {
    try {
        const { firstname, lastname, phoneNumber, email } = req.body
        const admin = await AdminModel.findById(req.admin?._id)
        if (!admin) {
           return res.status(404).json({
                message: "User not found"
            })
        }
        
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!EmailRegex.test(email)) {
            res.status(400).json({
                message: "Enter valid Email"
            })
        }

        
        admin.firstname = firstname
        admin.lastname = lastname
        admin.phoneNumber=phoneNumber
        admin.email=email

        await admin.save()
        
        res.status(200).json({
            message:"Admin Updated Successfully"
        })
    } catch (error) {
        res.status(400).json({
            message:"Admin not Updated",
            error:error.message
        })
    }
}

export const UpdateAvatar=async(req,res)=>{
try {   
        
        const admin=await AdminModel.findById(req.admin._id)        
        if(!admin){
            res.status(400).json({
                message:"User not Found"
            })
        }
        
        if(!req.file){
            return res.status(400).json({
                message:"Avatar is required"
            })
        }
        const uploaded=await uploadCloudinary(req.file.path)
        admin.avatar=uploaded.secure_url
        
        await admin.save()
        res.status(200).json({
            message:"Profile Updated",
            avatar:admin.avatar
        })
    } catch (error) {
        console.log(error);
        
    res.status(400).json({
        message:"Not update the profile",
        error:error.message
    })
}
} 

export const getadminStatus=async(req,res)=>{
    try {
        
        if(req.role !=="admin"){
            return res.status(404).json({
                message:"Access Denied"
            })
        }
        const totaluser=await userModel.countDocuments()
        const totalproduct=await ProductModel.countDocuments()
        const totalorders=await Order.countDocuments()
        const orders=await Order.find().populate("user","fullname")
        
        const totalRevenue=orders.reduce(
            (acc,order)=>acc+order.totalamount,0
            
        )   
         

        res.status(201).json({
            totaluser,
            totalproduct,
            orders,
            totalorders,
            totalRevenue
        })
    } catch (error) {
        console.log(error);
        
        res.status(404).json({
            message:error.message
        })
    }
}

