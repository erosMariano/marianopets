import storage from "@/config/firebase.config";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import { Trash, Pen, WarningCircle } from "phosphor-react";
import React, { useEffect, useState } from "react";

interface CardAnimalProps {
  name: string;
  id: string;
  city: string;
  details: string;
  photos: string[];
  setDeletePet: (id: string) => void;
}
function CardAnimal({
  name,
  id,
  city,
  details,
  photos,
  setDeletePet,
}: CardAnimalProps) {
  const [images, setImages] = useState<string[]>([""]);
  const [heightCard, setHeightCard] = useState(true);
  const [pending, setPending] = useState(false);

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

  const route = useRouter();

  function handleEditAnimal() {
    // route.push(`/doador/editar-animal/${id}`)
  }

  function handleDeleteAnimal(id: string) {
    setPending((prevState) => !prevState);
    setDeletePet(id);
  }
  return (
    <div
      className={`${
        heightCard ? "max-h-[106px] lg:max-h-[64px] overflow-hidden" : "max-h-full"
      } shadow-sm bg-white p-3 w-full rounded-lg transition-all `}
      key={id}
    >
      <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between items-start lg:items-center">
        <h2 className="text-slate-700">
          <span className="font-semibold mr-2"> Nome do PET:</span>
          {name}
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={handleStateCard}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 transition-all"
          >
            {heightCard ? "Abrir card" : "Fechar Card"}
          </button>
          <button
            onClick={() => handleDeleteAnimal(id)}
            title={!pending ? "Deletar" : "Salvar para deletar"}
            className="text-red-400"
          >
            {pending ? (
              <WarningCircle size={20} weight="fill" />
            ) : (
              <Trash size={20} weight="fill" />
            )}
          </button>
          <button
            onClick={handleEditAnimal}
            title="Editar"
            className="text-purple-500"
          >
            <Pen size={20} weight="fill" />
          </button>
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-slate-700">
          <span className="font-semibold mr-2">Cidade onde vive:</span> {city}
        </h2>
        <h2 className="text-slate-700 my-3">
          <span className="font-semibold mr-2">Detalhes sobre o animal:</span>{" "}
          {details}
        </h2>

        <div className="flex gap-2 flex-wrap items-start">
          {images[0] !== "" &&
            images.map((url) => (
              <Image
                src={url}
                alt=""
                key={url}
                width={200}
                height={200}
                style={{ objectFit: "contain" }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default CardAnimal;
