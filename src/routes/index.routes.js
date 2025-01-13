import { Router } from 'express';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import vacancyRouter from './vacancy.routes.js';

const router = Router();
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/vacancy', vacancyRouter);

export default router;