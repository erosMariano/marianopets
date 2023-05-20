import storage from "@/config/firebase.config";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface CardAnimalProps {
  name: string;
  id: string;
  city: string;
  details: string;
  photos: string[];
}
function CardAnimal({ name, id, city, details, photos }: CardAnimalProps) {
  const [images, setImages] = useState<string[]>([""]);

  useEffect(() => {
    async function getImagesFromFirebase() {
      const downloadUrls = await Promise.all(
        photos.map(async (imagePath) => {
          const itemRef = ref(storage, imagePath);
          return await getDownloadURL(itemRef);
        })
      );
      setImages(downloadUrls);
    }
    getImagesFromFirebase();
  }, [photos]);

  return (
    <div className="shadow-sm bg-white p-3" key={id}>
      <h2>Nome: {name}</h2>
      <h2>Cidade onde vive: {city}</h2>
      <h2>Detalhes sobre o animal{details}</h2>

      {images[0] !== "" &&
        images.map((url) => <Image src={url} alt="" key={url}  width={200} height={200}/>)}
    </div>
  );
}

export default CardAnimal;
