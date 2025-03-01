import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     name: {type:String,required:true},
     email: {type:String,required:true},
     password: {type:String,required:true},
     avgRating : {type:Number , default:0}
}
)
const userModel = mongoose.models.user || mongoose.model('user', userSchema)
export default userModel