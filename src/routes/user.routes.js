import { Router } from 'express';
import { createProfile, getAllUsers, getUser, updateProfile } from '../controllers/user.controller.js';
import { validateBody, validateQuery, validateToken } from '../middlewares/validate.middleware.js';
import { createProfileSchema, getAllUsersSchema, getUserSchema, updateProfileSchema } from '../schemas/user.schema.js';

const userRouter = Router();

userRouter.get('/all', validateToken, validateQuery(getAllUsersSchema), getAllUsers);

userRouter.post('/profile', validateToken, validateBody(createProfileSchema), createProfile);

userRouter.put('/profile', validateToken, validateBody(updateProfileSchema), updateProfile);

userRouter.get('/:id', validateToken, validateQuery(getUserSchema), getUser);

export default userRouter;