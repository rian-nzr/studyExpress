import { Router } from "express";
import authRouter from "./auth.route";


const rRouter:Router = Router();

rRouter.use('/auth', authRouter);


export default  rRouter