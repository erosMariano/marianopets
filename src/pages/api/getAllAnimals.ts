import { prisma } from "../../../lib/prisma";

export default async function handleUpload(req: any, res: any) {
  if (req.method === "GET") {
    try {
      const animals = await prisma.animal.findMany();

      res.status(200).json({ animals: animals });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao obter as URLs das imagens" });
    }
  }
}
