import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcrypt";

interface UserCadastro {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface CreateUserResponse {
  message: string;
  token?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateUserResponse>
) {
  const { email, name, password, phone }: UserCadastro = req.body;

  if (req.method === "POST") {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!existingUser) {
      const createdUser = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          phone,
        },
      });

      return res.status(201).json({ message: "Usuário criado" });
    } else {
      return res.status(409).json({ message: "Usuário já existente" });
    }
  }
  return res.status(405).end();
}
