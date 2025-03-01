import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary";
import postModel from "../models/postsModel.js"
import { getRatingFromText } from "../gemini/genAi.js"
import {updateUserAvgRating} from './userController.js'
dotenv.config()
const addPost = async(req,res)=>{
     try {
          const {token} = req.headers
          if(!token) {
               return res.json({success: false, message: "No token provided"})
          }

          const {name, image, description} = req.body
          if(!name) {
               return res.json({success: false, message: "Name is required"})
          }

          const decoded = jwt.verify(token, process.env.JWT_SECERT)
          const id = decoded.id

          let imageUrl = null
          if(image) {
               // Upload image to cloudinary
               const uploadResponse = await cloudinary.uploader.upload(image, {
                    upload_preset: 'ml_default'
               });

               if(!uploadResponse.secure_url) {
                    imageUrl = undefined;
               }
               imageUrl = uploadResponse.secure_url
          }

          // Get AI rating using the imported function
          const ratingResponse = await getRatingFromText({body: {name}})
          const aiRating = Number(ratingResponse.message)

          const newPost = new postModel({
               name,
               image: imageUrl,
               description,
               rating: aiRating,
               userId: id
          })

          const post = await newPost.save()
          if (!post._id) {
               return res.json({success: false, message: "Failed to post"})
          }

          await updateUserAvgRating(id)

          res.json({success: true, message: "New post added"})
     } catch (error) {
          console.log(error.message)
          res.json({success: false, message: error.message})
     }
}

const deletePost = async(req,res)=>{
     try {
          const {token} = req.headers
          if(!token) {
               return res.json({success: false, message: "No token provided"})
          }

          const {id} = req.body
          if(!id) {
               return res.json({success: false, message: "Post ID is required"})
          }

          const decoded = jwt.verify(token, process.env.JWT_SECERT)
          const userId = decoded.id

          const post = await postModel.findById(id)
          if(!post) {
               return res.json({success: false, message: "Post not found"})
          }

          if(post.userId !== userId) {
               return res.json({success: false, message: "Not authorized to delete this post"})
          }

          const deletedPost = await postModel.findByIdAndDelete(id)
          if(!deletedPost) {
               return res.json({success: false, message: "Failed to delete post"})
          }

          await updateUserAvgRating(userId)

          res.json({success: true, message: "Post deleted successfully"})
     } catch (error) {
          console.log(error.message)
          res.json({success: false, message: error.message})
     }
}

export {addPost , deletePost}