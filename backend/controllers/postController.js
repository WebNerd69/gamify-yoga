import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary";
import postModel from "../models/postsModel.js"
import { getRatingFromText } from "../gemini/genAi.js"
import { updateUserAvgRating } from './userController.js'
dotenv.config()
const addPost = async (req, res) => {
     try {
          const { token } = req.headers
          if (!token) {
               return res.status(401).json({ success: false, message: "No token provided" })
          }

          const { name, description } = req.body
          if (!name) {
               return res.status(400).json({ success: false, message: "Name is required" })
          }

          const decoded = jwt.verify(token, "allahuakbar")
          const id = decoded.id
          const image = req.file
          let imageUrl = null

          if (image) {
               // Upload image to cloudinary
               try {
                    const result = await cloudinary.uploader.upload(image.path)
                    imageUrl = result.secure_url || undefined
               } catch (uploadError) {
                    console.error("Cloudinary upload error:", uploadError)
                    return res.status(500).json({ success: false, message: "Image upload failed" })
               }
          }

          // Get AI rating using the imported function
          let aiRating
          try {
               const ratingResponse = await getRatingFromText({ body: { name } })
               aiRating = Number(ratingResponse.message)
          } catch (ratingError) {
               console.error("AI rating error:", ratingError)
               return res.status(500).json({ success: false, message: "AI rating failed" })
          }

          const newPost = new postModel({
               name,
               image: imageUrl,
               description,
               rating: aiRating,
               userId: id
          })
          console.log(imageUrl, name, description, aiRating, id)
          const post = await newPost.save()
          if (!post._id) {
               return res.status(500).json({ success: false, message: "Failed to post" })
          }

          await updateUserAvgRating(id)

          res.status(201).json({ success: true, message: "New post added", post })
     } catch (error) {
          console.error("Error in addPost:", error)
          res.status(500).json({ success: false, message: error.message })
     }
}

const deletePost = async (req, res) => {
     try {
          const { token } = req.headers
          if (!token) {
               return res.json({ success: false, message: "No token provided" })
          }

          const { id } = req.body
          if (!id) {
               return res.json({ success: false, message: "Post ID is required" })
          }

          const decoded = jwt.verify(token,"allahuakbar")
          const userId = decoded.id

          const post = await postModel.findById(id)
          if (!post) {
               return res.json({ success: false, message: "Post not found" })
          }

          if (post.userId !== userId) {
               return res.json({ success: false, message: "Not authorized to delete this post" })
          }

          const deletedPost = await postModel.findByIdAndDelete(id)
          if (!deletedPost) {
               return res.json({ success: false, message: "Failed to delete post" })
          }

          await updateUserAvgRating(userId)

          res.json({ success: true, message: "Post deleted successfully" })
     } catch (error) {
          console.log(error.message)
          res.json({ success: false, message: error.message })
     }
}

const getPostData = async (req, res) => {
     try {
          const data = await postModel.find({})
          res.json({ success: true, data })
     } catch (error) {
          console.error(error.message)
          res.json({ success: false, message: error.message })
     }
}
const getUserPostData = async (req, res) => {
     const { token } = req.headers
     
     if (!token) {
          return res.json({ success: false, message: "No token provided" })
     }
     const decoded = jwt.verify(token,"allahuakbar")
     const userId = decoded.id
     
     try {
          let post = await postModel.find({})
          post = post.filter((item)=>item.userId == userId)
          res.json({ success: true, post })
     } catch (error) {
          console.error(error.message+"1")
          res.json({ success: false, message: error.message })
     }
}
export { addPost, deletePost, getPostData, getUserPostData }