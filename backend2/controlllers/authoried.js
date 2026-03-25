import { userModel } from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        let { phoneNumber, fullname, email, password, confirm_password } = req.body
        const existingUser = await userModel.findOne({
            $or: [{ email }, { phoneNumber }]
        })
        if (password !== confirm_password) {
            res.status(400).json({
                message: "Password should be Same"
            })
        }
        if (existingUser) {
            return res.status(400).json({
                message: "User already Exist"
            })
        }
        const hash = await bcrypt.hash(password, 10)

        const createUser = await userModel.create({
            phoneNumber,
            fullname,
            email,
            password: hash,
        })
        res.status(201).json({
            message: "User registered successfully",
            user: createUser
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

export const LoginUser = async (req, res) => {
    try {

        const { identifier, password } = req.body

        if (!identifier || !password) {
            return res.status(400).json({
                message: "Please enter email/phone and password"
            });
        }

        let user;

        if (identifier.includes("@")) {
            user = await userModel.findOne({ email: identifier });
        } else {
            user = await userModel.findOne({
                phoneNumber: Number(identifier)
            });
        }

        if (!user) {
            res.status(400).json({
                message: "User Not Found"
            })
        }

        const pass = await bcrypt.compare(password, user.password)
        if (!pass) {
            res.status(404).json({
                message: "Enter Correct Password"
            })
        }


        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        const option = {
            httpOnly: true,
            secure: false
        }

        res
            .status(200)
            .cookie('accessToken', accessToken, option)
            .cookie('refreshToken', refreshToken, option)
            .json({
                message: "User Login Successfully",
                user,
                accessToken,
                refreshToken
            })
    } catch (error) {
        console.log(error);

        res.status(404)
            .json({
                message: "Login Failed",
                error: error.message
            })
    }
}

export const Getuser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id)
        res.status(200).json({
            message: "User details",
            user,
            role: req.role
        })
    } catch (error) {
        res.status(404).json({
            message: "Server Errror", error
        })
    }
}

export const RefreshToken = async (req, res) => {
    try {
        const incomingtoken = req.cookies.refreshToken
        if (!incomingtoken) {
            return res.status(404).json({
                message: "Unathorized Request"
            })
        }

        const deocded = jwt.verify(incomingtoken, process.env.REFRESH_TOKEN_SECRET)
        const user = await userModel.findById(deocded._id)
        if (!user) {
            return res.status(401).json({
                message: "Invalid refresh token"
            })
        }
        if (incomingtoken !== user.refreshToken) {
            return res.status(401).json({
                message: "Reffresh token is expired"
            })
        }
        const accessToken = user.generateAccessToken()
        const option = {
            httpOnly: true,
            secure: false
        }
        res.status(200)
            .cookie("accessToken", accessToken, option)
            .json({
                message: "New Access genearted"
            })
    } catch (error) {
        res.status(401).json({
            message: "not generated", error
        })
    }
}

export const LogoutUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.user._id,
            {
                $set: {
                    refreshToken: ""
                }
            }, { returnDocument: "after" }
        )

        const option = {
            httpOnly: true,
            secure: false
        }

        res.status(200)
            .clearCookie('accessToken', option)
            .clearCookie('refreshToken', option)
            .json({
                message: "Logout Successfully"
            })
    } catch (error) {
        console.log(error);

        res.status(404).json({
            message: "Invalid refresh Token",
            error: error?.message
        })
    }
}

export const changePassword = async (req, res) => {
    try {
        const { oldpassword, newpassword } = req.body
        if (!oldpassword || !newpassword) {
            return res.status(400).json({
                message: "Both passwords are required"
            })
        }

        const user = await userModel.findById(req.user?.id)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(
            oldpassword,
            user.password
        )

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Old password is incorrect"
            })
        }

        const newhashedPassword = await bcrypt.hash(newpassword, 10)

        user.password = newhashedPassword
        await user.save()

        return res.status(200).json({
            message: "Password changed successfully"
        })

    } catch (error) {

        return res.status(500).json({
            message: "Server error",
            error: error.message
        })

    }
}

export const Forgetpassword = async (req, res) => {
    try {
        const { identifier } = req.body

        const user = await userModel.findOne({
            $or: [
                { email: identifier },
                { phoneNumber: identifier }
            ]
        })
        if (!user) {
            res.status(400).json({
                message: "Invalid Email or Number"
            })
        }
        const token = jwt.sign(
            { id: user._id },
            "baba",
            {
                expiresIn: '5m'
            }
        )

        res.status(200).json({
            message: "Email is verified Successfully",
            token
        })
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

export const ResetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            })
        }

        const decoded = jwt.verify(token, "baba")
        if (!decoded) {
            res.status(404).json({
                message: "Invalid Token"
            })
        }

        const user = await userModel.findById(decoded.id)
        console.log("User after decoded: ", user);
        if (!user) {
            res.status.json({
                message: "Invalid Token"
            })
        }

        const isSame = await bcrypt.compare(password, user.password)
        if (isSame) {
            return res.status(400).json({
                message: "New password cannot be same as old password"
            })
        }

        const resetpassword = await bcrypt.hash(password, 10)
        user.password = resetpassword
        await user.save()

        return res.status(200).json({
            message: "Reset Password Successfully.."
        })
    } catch (error) {

        return res.status(401).json({
            message: "Reset password Failed OR token Expire"
        })
    }
}