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
  if (req.method === "POST") {
    try {
      // Processa os arquivos enviados pelo Multer
      upload.array("images", 1000)(req, res, async (error) => {
        if (error) {
          console.error("Error uploading images:", error);
          return res.status(500).json({ message: "Error uploading images" });
        }

        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
          return res.status(400).json({ message: "No images uploaded" });
        }

        const uploadPromises = files.map(async (file) => {
          const storageRef = ref(storage, `/files/${file.originalname}`);

          // Redimensiona a imagem para um tamanho desejado (por exemplo, 800x600)
          const resizedImageBuffer = await sharp(file.buffer)
            .resize(800, 600)
            .toBuffer();

          await uploadBytes(storageRef, resizedImageBuffer);

          // Se necessário, você pode retornar a URL de download para o cliente
          const downloadURL = await getDownloadURL(storageRef);
          return downloadURL;
        });

        await Promise.all(uploadPromises);

        return res
          .status(200)
          .json({ message: "Images uploaded successfully" });
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      return res.status(500).json({ message: "Error uploading images" });
    }
  }

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
