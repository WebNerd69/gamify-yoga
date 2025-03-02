import express from 'express';
import { deleteUser, getUserData, getUserDataForPost, userLogin , userRegister } from '../controllers/userController.js';

const userRouter = express.Router();
userRouter.post('/register',userRegister);
userRouter.post('/login',userLogin);
userRouter.post('/delete',deleteUser);
userRouter.get('/get',getUserData);
userRouter.post('/get/for-post',getUserDataForPost);

export default userRouter;