import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {hashSync} from "bcrypt"


const prisma = new PrismaClient();


export const login = async (req: Request, res: Response) =>{
res.send('login')
};

export const singup = async (req: Request, res: Response) =>{
  const {email, password, name} = req.body;

  let user = await prisma.user.findFirst({where: {email}});
  if(user){
    throw Error("User already exists!");
  }
  user = await prisma.user.create({
    data:{
      name,
      email,
      password: hashSync(password, 10)
    }
  })
  res.json(user)
}