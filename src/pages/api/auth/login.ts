import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface LoginUser {
  email: string;
  password: string;
}
const secretKey = process.env.JWT_SECRET;

export default async function LoginUserRouter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password }: LoginUser = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser?.password) {
      const resultHash = await compare(password, existingUser?.password);
      if (resultHash) {

        const claims = {
          sub: existingUser.id,
          myPersonName: existingUser.name,
        };

        const jwt = sign(claims, String(secretKey), {expiresIn: '1hr'});

        return res.status(201).json({ message: "Usuário existe", authJwt: jwt });
      } else {
        return res.status(201).json({ message: "Senha incorreta" });
      }
    }
    return res.status(404).json({ message: "Usuário não existe" });
  }
}
