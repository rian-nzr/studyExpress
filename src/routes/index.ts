import { Router } from "express";
import authRouter from "./auth";


const rRouter:Router = Router();

rRouter.use('/auth', authRouter);




export default  rRouter