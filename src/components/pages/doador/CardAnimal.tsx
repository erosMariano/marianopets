import storage from "@/config/firebase.config";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { Trash, Pen } from "phosphor-react";
import React, { useEffect, useState } from "react";

interface CardAnimalProps {
  name: string;
  id: string;
  city: string;
  details: string;
  photos: string[];
  setDeletePet: (id:string) => void;
}
function CardAnimal({ name, id, city, details, photos, setDeletePet }: CardAnimalProps) {
  const [images, setImages] = useState<string[]>([""]);
  const [heightCard, setHeightCard] = useState(true);



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

  function handleStateCard() {
    setHeightCard((prevState) => !prevState);
  }


  return (
    <div
      className={`${
        heightCard ? "max-h-[48px] overflow-hidden" : "max-h-full"
      } shadow-sm bg-white p-3 w-full rounded-lg transition-all`}
      key={id}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-slate-700"><span className="font-semibold mr-2"> Nome do PET:</span>{name}</h2>

        <div className="flex items-center gap-2">
          <button onClick={handleStateCard}>
            Abrir card
          </button>
          <button onClick={() => setDeletePet(id)} title="Deletar" className="text-red-400">
            <Trash size={20} weight="fill" />
          </button>
          <button title="Editar" className="text-purple-500">
            <Pen size={20} weight="fill" />
          </button>
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-slate-700">
          <span  className="font-semibold mr-2">Cidade onde vive:</span> {city}
        </h2>
        <h2 className="text-slate-700 my-3">
          <span className="font-semibold mr-2">Detalhes sobre o animal:</span> {details}
        </h2>

        {images[0] !== "" &&
          images.map((url) => (
            <Image src={url} alt="" key={url} width={200} height={200} />
          ))}
      </div>
    </div>
  );
}

export default CardAnimal;
