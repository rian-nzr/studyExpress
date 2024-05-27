import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { compareSync, hashSync } from "bcrypt"
import { generateAuthTokens } from '../utils/token'


const prisma = new PrismaClient();



const singup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  let user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    res.status(400).json({ message: "Email already exists" });
    return;
  }
  user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10)
    }
  })
  res.json(user)
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    res.status(404).json({ message: "user not foutd!!!" });
    return;
  }
  if (!compareSync(password, user.password)) {
    res.status(400).json({ message: "password wrong!!!" });
    return;
  }
  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email
  }
  const token = await generateAuthTokens(userWithoutPassword)
  res.status(200).json({ user, token })
};

export default { singup, login }