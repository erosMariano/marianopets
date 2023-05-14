import { compare } from "bcrypt";
import cookie from "cookie";
import { sign } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

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
          emailUser: existingUser.email,
        };

        const jwt = sign(claims, String(secretKey), { expiresIn: "72hrs" });

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("authpetsmariano", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 60 * 60 * 3, //3 dias
            path: "/",
          })
        );
        return res
          .status(201)
          .json({ message: "Bem vindo ao petsMariano", userEmail: email });
      } else {
        return res
          .status(401)
          .json({ type: "password", message: "Senha incorreta" });
      }
    }
    return res
      .status(404)
      .json({ type: "user", message: "Usuário não existe" });
  }
}
