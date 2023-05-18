import { Header } from "@/components/Header";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { api } from "../../../lib/axios";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import storage from "@/config/firebase.config";
import { authValidate } from "@/utils/authUtils";

interface PropsFormDoacao {
  people: {
    id: string;
    email: string;
    name: string;
    phone: string;
  };
}

interface PropsRegisterAnimal {
  name: string;
  city: string;
  details: string;
  photos: File[];
}

interface RegisterAnimal {
  name: string;
  city: string;
  details: string;
  photos: string[];

  tutorId: string;
  tutorName: string;
  tutorEmail: string;
  tutorPhone: string;
  publishedAt: Date;
}
function FormDoacao({ people }: PropsFormDoacao) {
  const [dataAnimal, setDataAnimal] = useState<PropsRegisterAnimal>({
    city: "",
    details: "",
    name: "",
    photos: [],
  });

  //

  async function uploadFileToFirebase() {
    for (let i = 0; i < dataAnimal.photos.length; i++) {
      try {
        const imageRef = ref(storage, `/files/${dataAnimal.photos[i].name}`);
        const result = await uploadBytes(imageRef, dataAnimal.photos[i]);
        console.log("success");
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const referencePhotos = dataAnimal.photos.map((el) => {
      return `/files/${el.name}`;
    });

    const dataUser: RegisterAnimal = {
      name: dataAnimal.name,
      details: dataAnimal.details,
      city: dataAnimal.city,
      photos: referencePhotos,
      tutorEmail: people.email,
      tutorId: people.id,
      tutorName: people.name,
      tutorPhone: people.phone,
      publishedAt: new Date(),
    };

    try {
      await api.post("/registerAnimal", dataUser);
      uploadFileToFirebase();
    } catch (error) {
      alert(error);
    }
  }

  async function getImages() {
    // Puxar imagens específicas
    const imagesTeste = [
      "/files/gato-e-mamifero-entenda-mais-sobre-a-especie.webp",
    ];
  
    const downloadUrls = await Promise.all(
      imagesTeste.map(async (item) => {
        const imagesRef = ref(storage, item);
        const downloadURL = await getDownloadURL(imagesRef);
        return downloadURL;
      })
    );
  
    console.log(downloadUrls);
  }
  return (
    <>
      <Header authenticated />
      <div className="font-bold text-center mt-20">Olá, {people.name}</div>

      <div className="w-96 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md w-full rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={dataAnimal.name}
              onChange={(e) =>
                setDataAnimal({ ...dataAnimal, name: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              type="text"
              placeholder="Enter your city"
              value={dataAnimal.city}
              onChange={(e) =>
                setDataAnimal({ ...dataAnimal, city: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="details"
            >
              Details:
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="details"
              placeholder="Enter details"
              value={dataAnimal.details}
              onChange={(e) =>
                setDataAnimal({ ...dataAnimal, details: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="files"
            >
              Upload files:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="files"
              type="file"
              multiple
              placeholder="Enter your city"
              required
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setDataAnimal({ ...dataAnimal, photos: Array.from(files) });
                }
              }}
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="mt-40 mb-40 flex items-center justify-center">
        <button onClick={getImages} className="bg-orange-300 p-4 rounded-sm">
          Puxar imagens
        </button>
      </div>
    </>
  );
}
export default FormDoacao;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await authValidate(context);
};
