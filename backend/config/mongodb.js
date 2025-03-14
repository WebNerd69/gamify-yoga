import mongoose from "mongoose"
import dotenv from "dotenv"

// Configure dotenv
dotenv.config()

const connectDB = async ()=>{
     mongoose.connection.on('connected',()=>{
          console.log('DB connected')
     })
     await mongoose.connect(`${process.env.MONGODB_URI}/gamify`)
}

export default connectDB;