import express from 'express';
import { deleteUser, userLogin , userRegister } from '../controllers/userController.js';

const userRouter = express.Router();
userRouter.post('/register',userRegister)
userRouter.post('/login',userLogin)
userRouter.post('/delete',deleteUser)

export default userRouter