import { AddressModel } from "../models/address.model.js"


export const Saveadress = async (req, res) => {
    try {
        
        const userId = req.user._id
        const { name, phonenumber,building_name,road_name,near_by, city, state, pin } = req.body
        if (!name || !phonenumber || !road_name || !building_name  || !city || !state || !pin) {
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        
        if (name.length < 3){
            return res.status(400).json({
                message:"Name to Short"
            })
        } 

        if (!/^[0-9]{10}$/.test(phonenumber)){
            return res.status(400).json({
                message:'Invalid phone number'
            })
        }

        if (!/^[0-9]{6}$/.test(pin)){
            return res.status(400).json({
                message:"Invalid PIN code"
            })
        }
        
       const address= await AddressModel.create({
         name, phonenumber, building_name,road_name,near_by, city, state, pin,
         user: userId
       })
       res.status(201).json({
        message:"Address saved successfully",
        address
       })
    } catch (error) {
        console.log(error);
                
        res.status(404).json({
            message:"Server Error",error
        })
    }
}

export const getAdress=async(req,res)=>{
    try {
        const userId=req.user._id
        const address=await AddressModel.find({user:userId}).sort({createdAt:-1})
        res.status(200).json({
            success:true,
            count:address.length,
            address
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message
        })
    }
}

export const updateAddress=async(req,res)=>{
    try {
        
        const userId=req.user._id
        const {id}=req.params
        const updated=await AddressModel.findOneAndUpdate({user:userId,_id:id},
            req.body,
            {returnDocument:"after"}
        )
        if(!updated){
           return res.status(404).json({
                message:"Address not found"
            })
        }

        res.status(200).json({
            message:"updated Succesfully"
        })
    } catch (error) {      
        console.log(error);
        res.status(400).json({
            message:error.message
        })
    }
}