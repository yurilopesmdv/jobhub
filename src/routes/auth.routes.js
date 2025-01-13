import { Router } from 'express';
import { validateBody, validateToken } from '../middlewares/validate.middleware.js';
import { signinSchema, signupSchema } from '../schemas/auth.schema.js';
import { logout, signin, signup } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/login', validateBody(signinSchema), signin);

authRouter.post('/register', validateBody(signupSchema), signup);

authRouter.post('/logout', validateToken, logout);

export default authRouter;