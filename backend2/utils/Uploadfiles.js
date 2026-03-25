import { v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from "dotenv";
dotenv.config();


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadCloudinary=async(localfilePath)=>{
    try {

        
        if(!localfilePath) return null
       let response=await cloudinary.uploader.upload(localfilePath,{
            resource_type:"auto",
            timeout:60000
        })        
        return response
    } catch (error) {
        console.log(error)
        fs.unlinkSync(localfilePath)   
        return null     
    }
}
export {uploadCloudinary}