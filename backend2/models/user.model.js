import mongoose  from "mongoose"
import jwt from 'jsonwebtoken'

const userSchema=new mongoose.Schema(
    {
        phoneNumber:{
            type:Number,
            required:true
        },
        fullname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        confirm_password:{
            type:String,
        },
        refreshToken:{
            type:String,
        }

    }
    
    ,{
        timestamps:true
    })


userSchema.methods.generateAccessToken=function(expiresIn="2h"){
    
    return  jwt.sign(
            
            {
                id:this._id,
                email:this.email,
                fullname:this.fullname,
                role:"user"
            },
            process.env.ACCESS_TOKEN_SECRET,
            {  expiresIn  }
        )
    }

userSchema.methods.generateRefreshToken=function(){
        return jwt.sign(
            {
                id:this._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:'7d'
            }
        )
    }
export const userModel=mongoose.model('user',userSchema)