import { ref, listAll, getDownloadURL } from "firebase/storage";
import storage from "@/config/firebase.config";
import { prisma } from "../../../lib/prisma";

export default async function handleUpload(req: any, res: any) {
  if (req.method === "GET") {
    try {
      const imagesRef = ref(storage, "files");
      const { items } = await listAll(imagesRef);

      const downloadUrls = await Promise.all(
        items.map(async (item) => {
          const downloadURL = await getDownloadURL(item);
          return downloadURL;
        })
      );

      res.status(200).json({ urls: downloadUrls });
    } catch (error) {
      console.error("Erro ao obter as URLs das imagens:", error);
      res
        .status(500)
        .json({ error: "Ocorreu um erro ao obter as URLs das imagens" });
    }
  }

  if (req.method === "DELETE") {
    const { 'ids[]': itemIds } = req.query;

    try {
      await prisma.animal.deleteMany({
        where:{
          id: {
            in:itemIds
          }
        }
      })
      return res.status(200).json({ message: "Deletado com sucesso!" });
    } catch (error) {
      return res.status(404).json({ message: "Erro ao deletar" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
