import { Router } from "express";
import authControlle from "../controllers/auth.controller";

const authRouter:Router = Router();

authRouter.post('/login', authControlle.login);
authRouter.post('/singup', authControlle.singup)


export default  authRouter