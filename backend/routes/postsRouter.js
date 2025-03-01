import express from 'express';
import { addPost, deletePost } from '../controllers/postController.js';
import {getRatingFromText} from '../gemini/genAi.js'
const postsRouter = express.Router();

postsRouter.post('/add', addPost);
postsRouter.post('/delete', deletePost);
postsRouter.post('/get-ai-rating-from-text',getRatingFromText)
export default postsRouter
