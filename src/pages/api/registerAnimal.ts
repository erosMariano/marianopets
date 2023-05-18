import { NextApiRequest, NextApiResponse } from "next";
import { authenticated } from "./auth/authorization";
import { prisma } from "../../../lib/prisma";

interface RegisterAnimal {
  name: string;
  city: string;
  details: string;
  photos: string[];

  tutorId?: string;
  tutorName: string;
  tutorEmail: string;
  tutorPhone: string;
  publishedAt: Date;
  type: string;
}

export default authenticated(async function RegisterAnimal(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    name,
    city,
    details,
    photos,
    publishedAt,
    tutorEmail,
    tutorId,
    tutorName,
    tutorPhone,
    type
  } = req.body as RegisterAnimal;

  const registerAnimalData: RegisterAnimal = {
    name: name.trim(),
    city: city.trim(),
    details: details.trim(),
    photos: photos,
    publishedAt: publishedAt,
    tutorEmail: tutorEmail,
    tutorName: tutorName,
    tutorPhone: tutorPhone,
    type: type
  };

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
    await prisma.user.update({
      where: {
        id: tutorId,
      },
      data: {
        Animal: {
          create: registerAnimalData,
        },
      },
    });
    res.status(201).json({ message: "Animal criado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao criar o animal" });
  }
});
