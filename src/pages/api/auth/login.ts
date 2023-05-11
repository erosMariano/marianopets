import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

interface LoginUser {
  email: string;
  password: string;
}

export default async function LoginUserRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email }: LoginUser = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      console.log(existingUser)
      res.status(201).json({ message: "Usuário existe, logar" });
    }else{
      res.status(404).json({ message: "Usuário não existe" });
    }
  }
}
