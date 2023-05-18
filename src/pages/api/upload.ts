import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import multer from "multer";
import storage from "@/config/firebase.config";
import sharp from "sharp";

// Configuração do Multer para armazenar os arquivos no disco
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 1000 * 1024 * 1024, // 10 MB
  },
});

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

  return res.status(405).json({ message: "Method Not Allowed" });
}
