import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import { Inter } from "next/font/google";
import Sidebar from "@/components/pages/doador/Sidebar";
import { myFont } from "@/components/pages/Home/Hero";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { GetServerSideProps } from "next";
import { authValidate } from "@/utils/authUtils";
import SelectAnimal from "@/components/pages/doador/DropdownSelectAnimal";
import UploadIcon from "../../assets/images/icons/upload.svg";
import Image from "next/image";
import { createFileList } from "@/utils/createFileList";
/*
  id      String @id @default(auto()) @map("_id") @db.ObjectId
  name    String
  city    String
  details String

  tutorName  String
  tutorEmail String
  tutorPhone String

  publishedAt DateTime
  photos      String[]
  type        String
*/
interface PropsFormDoacao {
  people: {
    id: string;
    email: string;
    name: string;
    phone: string;
  };
}

interface PreviewImageFrontEnd {
  nameImage: string;
  urlImage: string;
  id: string;
}
function CadastrarAnimal({ people }: PropsFormDoacao) {
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<PreviewImageFrontEnd[]>([]);
  const [imagesFiles, setImagesFile] = useState<FileList | null>();

  function selectImages() {
    if (!inputImageRef.current) return;
    inputImageRef.current.click();
  }

  function changeImageHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files;

    // Preview front-end
    const selectedFilesArray = Array.from(selectedFiles!);
    const imagesArray = selectedFilesArray.map((file, index) => {
      return {
        nameImage: file.name,
        id: crypto.randomUUID(),
        urlImage: URL.createObjectURL(file),
      };
    });
    setImagesFile(selectedFiles);
    setImagePreview(imagesArray);
  }


  function removeImage(indexImage: string, position: number) {
    const updatedImagePreview = imagePreview.filter(
      (el) => el.id !== indexImage
    );
    const updatedImagesFiles = Array.from(imagesFiles!).filter(
      (file) => file.name !== imagePreview[position].nameImage
    );

    setImagesFile(createFileList(updatedImagesFiles));
    setImagePreview(updatedImagePreview);
  }

  return (
    <>
      <Head>
        <title>Mariano Pets - Nossos Pets</title>
        <meta
          name="description"
          content="Encontre seu companheiro perfeito para adoção no nosso site de adoção de animais. Temos cães, gatos e outros animais em busca de um lar amoroso. Visite-nos hoje para encontrar o amigo peludo ideal!"
        />
      </Head>
      <main
        className={`${inter.className} flex flex-grow mt-10 lg:mt-20 justify-between w-full max-w-[1312px] mx-auto px-4 gap-6`}
      >
        <Sidebar activeMenu="novo-animal" />

        <form className="w-full flex flex-col gap-4">
          <SelectAnimal />

          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border-gray-300 font-semibold outline-none transition-all border focus:border-yellow-500 text-gray-700"
            required
            placeholder="Nome do animal"
          />
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border-gray-300 font-semibold outline-none transition-all border focus:border-yellow-500 text-gray-700"
            required
            placeholder="Cidade do animal"
          />
          <textarea
            className="w-full resize-none px-4 py-2 h-44 rounded-md border-gray-300 font-semibold outline-none transition-all border focus:border-yellow-500 text-gray-700"
            required
            placeholder="Detalhes sobre o animal"
          />

          <button
            type="button"
            onClick={selectImages}
            className="flex gap-4 text-left w-full px-4 py-2 rounded-md border-gray-300 font-semibold outline-none transition-all border focus:border-yellow-500 text-gray-700 bg-white"
          >
            Upload foto animal
            <Image src={UploadIcon} width={24} height={24} alt="Icon upload" />
          </button>
          <input
            className="hidden"
            id="files"
            type="file"
            multiple
            placeholder="Enter your city"
            required
            accept="image/*"
            ref={inputImageRef}
            onChange={changeImageHandler}
          />

          {imagePreview[0] !== undefined ? (
            <div className="flex gap-4 flex-wrap">
              {imagePreview.map(({ urlImage, id }, position) => (
                <div key={id}>
                  <Image
                    src={urlImage}
                    alt=""
                    width={100}
                    height={100}
                    style={{ objectFit: "cover" }}
                  />
                  <button
                    type="button"
                    className="bg-red-400 text-white rounded-sm text-xs w-full py-1"
                    onClick={() => removeImage(id, position)}
                  >
                    deletar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
          <button
            className="w-full px-4 py-2 transition-all bg-orange-400 font-semibold text-white rounded-md hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-blue-950"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default CadastrarAnimal;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await authValidate(context);
};
