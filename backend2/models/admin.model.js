import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const adminSchema=new mongoose.Schema(
    {
        
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        age:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:Number,
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
        avatar:{
            type:String,
            required:true
        },
        coverImg:{
            type:String
        },
        otp:{
            type:String
        },
        

    }
    
    ,{
        timestamps:true
    })


adminSchema.methods.generateAccessToken=function(expiresIn="15m"){
    
        return  jwt.sign(
            {
                id:this._id,
                email:this.email,
                username:this.username,
                role:"admin"
            },
            process.env.ACCESS_TOKEN_SECRET,
            {  expiresIn  }
        )
    }


export const AdminModel=mongoose.model('admin',adminSchema)