import jwt from "jsonwebtoken";
import validator from 'validator';
import bcrypt from "bcrypt";
import userModel from './../models/userModel.js';
import dotenv from 'dotenv';
import postModel from '../models/postsModel.js';
dotenv.config()

const createToken = (id)=>{
     return jwt.sign({id}, process.env.JWT_SECERT) // Fixed typo in env variable name
}

const userRegister = async (req, res) => {
     try {
          const { name, email, password } = req.body
          
          // Add await to properly check if user exists
          const userExists = await userModel.findOne({ email })
          if (userExists) {
               return res.json({ success: false, message: "User already exists" })
          }

          // Fix validator check - pass email string directly
          if (!validator.isEmail(email)) {
               return res.json({ success: false, message: "Enter valid email" })
          }
          if (password.length < 8) {
               return res.json({ success: false, message: "Enter strong password" })
          }

          //  hashing user
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(password,salt)

          // adding users
          const newUser = new userModel({
               name,
               email, 
               password:hashedPassword
          })
          
          // Add await to properly save user
          const user = await newUser.save()
          const token = createToken(user._id)
          res.json({success:true,token})
     } catch (error) {
          console.log(error.message)
          res.json({success:false,message:error.message})
     }
}
const userLogin = async (req, res) => {
     try {
          const {email , password} = req.body
          // Add await to properly get user from database
          const user = await userModel.findOne({email})
          if (!user) {
               return res.json({
                    success: false,
                    message: "User does not exist"
               })
          }
          // Compare password with hashed password stored in database
          const isMatch = await bcrypt.compare(password, user.password)
          if (!isMatch) {
               return res.json({success:false, message:"Invalid credentials"})     
          }
          // Create JWT token with user ID
          const token = createToken(user._id)
          res.json({success:true, token})
     } catch (error) {
          console.log(error.message)
          res.json({success:false,message:error.message})
     }
}

const deleteUser = async(req,res) =>{
     try{
          const {token} = req.headers
          if(!token) {
               return res.json({success: false, message: "No token provided"})
          }
          
          const decoded = jwt.verify(token, process.env.JWT_SECERT)
          const userId = decoded.id

          const deletedUser = await userModel.findByIdAndDelete(userId)
          
          if(!deletedUser) {
               return res.json({success: false, message: "User not found"})
          }

          res.json({success: true, message: "User deleted successfully"})
     }catch(error){
          console.log(error.message)
          res.json({success: false, message: error.message})
     }
}

const updateUserAvgRating = async (userId) => {
     try {
          // Get all posts for this user
          const userPosts = await postModel.find({ userId: userId });
          
          if (userPosts.length === 0) {
               // If no posts, set average rating to 0
               await userModel.findByIdAndUpdate(userId, { avgRating: 0 });
               return;
          }

          // Calculate average rating
          const totalRating = userPosts.reduce((sum, post) => sum + post.rating, 0);
          const avgRating = Number((totalRating / userPosts.length).toFixed(2));

          // Update user's average rating
          await userModel.findByIdAndUpdate(userId, { avgRating: avgRating });

     } catch (error) {
          console.error("Error updating user average rating:", error.message);
     }
}

export { userLogin, userRegister, deleteUser, updateUserAvgRating }