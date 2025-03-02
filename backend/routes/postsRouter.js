import express from 'express';
import { addPost, deletePost, getPostData, getUserPostData } from '../controllers/postController.js';
import {getRatingFromText} from '../gemini/genAi.js'
import { addComment, deleteComment } from '../controllers/commentController.js';
import upload from '../middleware/multer.js';
const postsRouter = express.Router();

postsRouter.post('/add',upload.single("image"), addPost);
postsRouter.post('/delete', deletePost);
postsRouter.get('/list',getPostData);
postsRouter.get('/my-list',getUserPostData);
postsRouter.post('/get-ai-rating-from-text',getRatingFromText);
postsRouter.post('/comment/add',addComment);
postsRouter.post('/comment/delete',deleteComment);
export default postsRouter
