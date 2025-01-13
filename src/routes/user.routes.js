import { Router } from 'express';
import { createProfile, getAllUsers, getUser, updateProfile } from '../controllers/user.controller.js';
import { validateToken } from '../middlewares/validate.middleware.js';

const userRouter = Router();

userRouter.get('/all', validateToken, getAllUsers);

userRouter.post('/profile', validateToken, createProfile);

userRouter.put('/profile', validateToken, updateProfile);

userRouter.get('/:id', validateToken, getUser);

export default userRouter;