import { NextApiRequest, NextApiResponse } from "next";
import { authenticated } from "./auth/authorization";
import { JwtPayload, verify } from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET;

import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";

interface ReqBodyForm {
  name: string;
  city: string;
  details: string;
  photos: string[];
}

interface RegisterAnimal extends ReqBodyForm {
  tutorName: string;
  tutorEmail: string;
  tutorPhone: string;

  publishedAt: Date;
}

export default authenticated(async function RegisterAnimal(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookiesAuth = req.cookies.authpetsmariano;
  const { name, city, details, photos } = req.body as ReqBodyForm;

  if (cookiesAuth) {
    const decoded = jwt.verify(cookiesAuth, String(secretKey)) as JwtPayload;

    const existingUser = await prisma.user.findUnique({
      where: { email: decoded.emailUser },
    });

    if (!existingUser) return;

    const registerAnimalData: RegisterAnimal = {
      name: name.trim(), // Validação: remover espaços em branco no início e no final
      city: city.trim(),
      details: details.trim(),
      photos: photos, // Validação: certificar-se de que existe pelo menos uma foto
      tutorName: existingUser.name.trim(),
      tutorEmail: existingUser.email.trim(),
      tutorPhone: existingUser.phone.trim(),
      publishedAt: new Date(),
    };

    // Validação: verificar se todos os campos obrigatórios estão preenchidos
    if (
      !registerAnimalData.name ||
      !registerAnimalData.city ||
      !registerAnimalData.details ||
      !registerAnimalData.photos ||
      !registerAnimalData.tutorName ||
      !registerAnimalData.tutorEmail ||
      !registerAnimalData.tutorPhone
    ) {
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos" });
    }

    try {
      await prisma.animal.create({
        data: registerAnimalData,
      });

      res.status(201).json({ message: "Animal criado" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar o animal" });
    }
  }
});
