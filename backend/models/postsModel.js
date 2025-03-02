import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
     userId: {type:String , required:true},
     name:{type:String,required:true},
     description : {type: String},
     image : {type :String},
     date: {type :Number , default:Date.now()},
     rating : {type : Number , required: true},
     comments : {type: Array , default: []}
}, {minimize: false})

const postModel = mongoose.models.post || mongoose.model('post',postSchema)
export default postModel