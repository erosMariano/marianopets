// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";

interface UserCadastro {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //rota de cadastro
  if (req.method === "POST") {
    const { email, name, password, phone }: UserCadastro = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });

    console.log(req.body)

    if(!existingUser){
      await prisma.user.create({
        data: {
          email,
          name,
          password,
          phone,
        },
      });
      return res.status(201).json({ message: "Usuário criado" });
    }
  }
  return res.status(409).json({ message: "Usuário já existente" });
}
