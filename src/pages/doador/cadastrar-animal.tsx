import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import { Inter } from "next/font/google";
import Sidebar from "@/components/pages/doador/Sidebar";
import { Footer } from "@/components/Footer";
import { GetServerSideProps } from "next";
import { authValidate } from "@/utils/authUtils";
import SelectAnimal from "@/components/pages/doador/DropdownSelectAnimal";
import UploadIcon from "../../assets/images/icons/upload.svg";
import Image from "next/image";
import { createFileList } from "@/utils/createFileList";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterTypeAnimal } from "@/utils/filterTypeAnimal";
import { ref, uploadBytes } from "firebase/storage";
import storage from "@/config/firebase.config";
import { api } from "../../../lib/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const cadastroAnimalSchema = z.object({
  name: z.string().min(3, { message: "Digite o nome do animal" }),
  cidade: z
    .string()
    .min(4, { message: "Digite a cidade onde o animal se encontra" }),
  details: z.string().min(1, { message: "Escreva detalhes sobre o animal" }),
});

type CadastroAnimalSchema = z.infer<typeof cadastroAnimalSchema>;

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

function CadastrarAnimal({ people }: PropsFormDoacao) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CadastroAnimalSchema>({
    resolver: zodResolver(cadastroAnimalSchema),
  });

  const inputImageRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<PreviewImageFrontEnd[]>([]);
  const [imagesFiles, setImagesFile] = useState<FileList | null>();
  const [selectedItem, setSelectedItem] = useState("");

  const [validationErrors, setValidationErrors] = useState({
    animalType: true,
    image: true,
    activeForm: false,
  });

  function selectImages() {
    if (!inputImageRef.current) return;
    inputImageRef.current.click();
  }
  // Arrumar

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


  async function FormSubmit(data: CadastroAnimalSchema) {
    try {
      if (imagesFiles) {
        const referencePhotos = Array.from(imagesFiles).map((el) => {
          return `/files/${el.name}`;
        });

        const dataForBD: RegisterAnimal = {
          name: data.name,
          city: data.cidade,
          details: data.details,
          type: filterTypeAnimal(selectedItem),
          photos: referencePhotos,
          publishedAt: new Date(),
          tutorEmail: people.email,
          tutorName: people.name,
          tutorPhone: people.phone,
          tutorId: people.id,
        };
        setValidationErrors((prevState) => ({
          ...prevState,
          activeForm: false,
        }));
        await api.post("/registerAnimal", dataForBD);
        await uploadFileToFirebase();
        await toastActive(false);
        setImagePreview([]);
        reset();
        setSelectedItem("");
      }
    } catch (error) {
      console.log(error);
      toastActive(true);
    }
  }

  useEffect(() =>{
    console.log(imagesFiles)
  })

  async function uploadFileToFirebase() {
    try {
      if (imagesFiles) {
        const uploadFiles = Array.from(imagesFiles);
        for (let i = 0; i < uploadFiles.length; i++) {
          const imageRef = ref(storage, `/files/${uploadFiles[i].name}`);
          await uploadBytes(imageRef, uploadFiles[i]);
        }
      }
    } catch (err) {
      alert(err);
    }
  }

  async function toastActive(error: boolean) {
    if (!error) {
      toast.success(`Animal cadastrado`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(`Erro ao cadastrar animal`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  function validateSelectAndImages() {
    setValidationErrors((prevState) => ({ ...prevState, activeForm: true }));
  }

  useEffect(() => {
    setValidationErrors((prevState) => ({
      ...prevState,
      image: imagePreview.length > 0 || !validationErrors.activeForm,
      animalType: selectedItem !== "" || !validationErrors.activeForm,
    }));
  }, [imagePreview.length, selectedItem, validationErrors.activeForm]);

  return (
    <>
      <Head>
        <title>Mariano Pets - Nossos Pets</title>
        <meta
          name="description"
          content="Encontre seu companheiro perfeito para adoção no nosso site de adoção de animais. Temos cães, gatos e outros animais em busca de um lar amoroso. Visite-nos hoje para encontrar o amigo peludo ideal!"
        />
      </Head>
      <ToastContainer />

      <main
        className={`${inter.className} flex flex-grow mt-10 lg:mt-20 justify-between w-full max-w-[1312px] mx-auto px-4 gap-6`}
      >
        <Sidebar activeMenu="novo-animal" />

        <form
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit(FormSubmit)}
        >
          <SelectAnimal
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />

          {!validationErrors.animalType && (
            <span className="text-red-400 -mt-4 flex -mb-2 font-semibold">
              Selecione um tipo de animal
            </span>
          )}

          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border-gray-300 font-semibold outline-none transition-all border focus:border-yellow-500 text-gray-700"
            placeholder="Nome do animal"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-400 -mt-4 flex -mb-2 font-semibold">
              {errors.name.message}
            </span>
          )}

          <input
            type="text"
            className="w-full px-4 py-2 rounded-md border-gray-300 font-semibold outline-none transition-all border focus:border-yellow-500 text-gray-700"
            placeholder="Cidade do animal"
            {...register("cidade", { required: true })}
          />
          {errors.cidade && (
            <span className="text-red-400 -mt-4 flex -mb-2 font-semibold">
              {errors.cidade.message}
            </span>
          )}

          <textarea
            className="w-full resize-none px-4 py-2 h-44 rounded-md border-gray-300 font-semibold outline-none transition-all border focus:border-yellow-500 text-gray-700"
            placeholder="Detalhes sobre o animal"
            {...register("details", { required: true })}
          />
          {errors.details && (
            <span className="text-red-400 -mt-4 flex -mb-2 font-semibold">
              {errors.details.message}
            </span>
          )}

          <button
            type="button"
            onClick={selectImages}
            className="flex gap-4 text-left w-full px-4 py-2 rounded-md border-gray-300 font-semibold outline-none transition-all border focus:border-yellow-500 text-gray-700 bg-white"
          >
            Upload foto animal
            <Image src={UploadIcon} width={24} height={24} alt="Icon upload" />
          </button>
          {!validationErrors.image && (
            <span className="text-red-400 -mt-4 flex -mb-2 font-semibold">
              Faça upload de ao menos 1 foto
            </span>
          )}
          <input
            className="hidden"
            id="files"
            type="file"
            name="files"
            multiple
            placeholder="Enter your city"
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
            className="w-full px-4 py-2 transition-all bg-orange-400 font-semibold text-white rounded-md hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-orange-800"
            type="submit"
            disabled={isSubmitting}
            onClick={validateSelectAndImages}
          >
            {!isSubmitting ? 'Cadastrar' : 'Cadastrando'}
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
