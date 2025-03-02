import postModel from './../models/postsModel.js';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { v4 as uuidv4 } from 'uuid';
dotenv.config()
const addComment = async(req,res)=>{
     try {
          const {token} = req.headers;
          if (!token) {
               return res.status(401).send('Unauthorized');
          }
          const cId = uuidv4();
          const decoded = jwt.verify(token, "allahuakbar")
          const { postId, comment } = req.body;
          const post = await postModel.findById(postId);
          if (!post) {
              return res.status(404).send('Post not found');
          }
          const newComment = {
              commentId: cId,
              userId: decoded.id, // Assuming decoded.id is the correct way to access the user ID
              message: comment
          };
          post.comments.push(newComment);
          await post.save();
          res.status(201).send('Comment added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const deleteComment = async(req,res)=>{
    const { postId, commentId } = req.body;
    try {
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        const index = post.comments.findIndex(comment => comment.commentId === commentId);
        if (index === -1) {
            return res.status(404).send('Comment not found');
        }
        post.comments.splice(index, 1);
        await post.save();
        res.status(200).send('Comment deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export {addComment , deleteComment}