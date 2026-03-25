import mongoose from 'mongoose'

const connectDB= async ()=>{
    try {        
const Connection = await mongoose.connect(
                    process.env.MONGODB_URL,
                    {family:4}
                );        
console.log(`\n Mongodb Connected !!:${Connection.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB connection error",error);
        console.log(error.message);
    }
}

export default connectDB