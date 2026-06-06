import { Router } from 'express';
import { AuthController } from './auth.controller';

const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.post('/refresh-token', AuthController.refreshToken);
authRouter.post('/logout', AuthController.logout);

export default authRouter; 