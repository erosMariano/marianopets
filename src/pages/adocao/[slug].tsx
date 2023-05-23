import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

import Image from "next/image";
import iconLocation from "../../assets/images/icons/location.svg";
import iconPeople from "../../assets/images/icons/people.svg";
import { myFont } from "@/components/pages/Home/Hero";
import ShareIcon from "../../assets/images/icons/share.svg";
import ArrowButton from "../../assets/images/icons/arrow-button.svg";
import Carousel from "@/components/Carousel";
import PopupAdotar from "@/components/pages/PopupAdotar";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "../../../lib/prisma";
import { format, formatISO } from "date-fns";
import { getDownloadURL, ref } from "firebase/storage";
import storage from "@/config/firebase.config";
import { useRouter } from "next/router";

interface AnimalProps {
  dataAnimal: {
    publishedAt: string;
    id: string;
    name: string;
    city: string;
    state: string;
    CEP: string;
    details: string;
    tutorName: string;
    tutorEmail: string;
    tutorPhone: string;
    photos: string[];
    type: string;
    tutorId: string;
    image: [
      {
        downloadUrl: string;
      }
    ];
  }[];
}

function Animal({ dataAnimal }: AnimalProps) {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);

  function changeModal() {
    setOpenModal((prevState) => !prevState);
  }
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const animalWithId = dataAnimal[0].image.map((image, index) => {
    const { downloadUrl } = image;
    return {
      id: index,
      photoAnimal: downloadUrl,
    };
  });
  
  return (
    <>
      <Head>
        <title>
          Mariano Pets - {dataAnimal[0].name ? dataAnimal[0].name : ""}
        </title>
        <meta
          name="description"
          content="Encontre seu companheiro perfeito para adoção no nosso site de adoção de animais. Temos cães, gatos e outros animais em busca de um lar amoroso. Visite-nos hoje para encontrar o amigo peludo ideal!"
        />
      </Head>{" "}
      *
      <Header />
      <PopupAdotar
        email={dataAnimal[0].tutorEmail}
        isOpen={openModal}
        phone={dataAnimal[0].tutorPhone}
        setIsOpen={changeModal}
      />
      <main
        className={`${inter.className} flex-grow pb-10 mt-10 lg:mt-20 justify-between w-full max-w-[1312px] mx-auto px-4`}
      >
        <div className="flex justify-between gap-8 flex-col md:flex-row">
          <div className="w-full md:w-[500px]">
            <Carousel slides={animalWithId} />
          </div>

          <div className="flex w-full md:w-[600px] flex-col">
            <div className="flex items-center gap-4">
              <h2 className={`${myFont.className} text-dark-text text-4xl`}>
                {dataAnimal[0].name}
              </h2>
              <button>
                {" "}
                <Image
                  src={ShareIcon}
                  width={24}
                  height={24}
                  alt="localização share"
                />
              </button>
            </div>

            <div className="my-4 flex flex-col gap-2">
              <div className="flex gap-2">
                <Image
                  src={iconLocation}
                  width={24}
                  height={24}
                  alt="localização icone"
                />

                <span className="text-light-text text-base">
                  Está em {dataAnimal[0].city}, {dataAnimal[0].state}
                </span>
              </div>

              <div className="flex gap-2">
                <Image
                  src={iconPeople}
                  width={24}
                  height={24}
                  alt="Icone publicado"
                />
                <span className="text-light-text text-base">
                  Publicado por <strong>{dataAnimal[0].tutorName}</strong> em{" "}
                  {dataAnimal[0].publishedAt}
                </span>
              </div>

              <button
                onClick={() => setOpenModal(true)}
                className="w-full my-6 gap-3 transition-all p-3 rounded-full font-semibold text-white  flex items-center justify-center bg-[#8C62EC] hover:bg-purple-700"
              >
                Entrar em contato
                <Image src={ArrowButton} alt="" />
              </button>

              <div>
                <h2
                  className={`${myFont.className} text-dark-text text-2xl mt-4 mb-2`}
                >
                  Descrição de {dataAnimal[0].name}
                </h2>
                <p className="text-light-text text-lg">
                  {dataAnimal[0].details}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Animal;

export const getStaticPaths: GetStaticPaths = async () => {
  const animals = await prisma.animal.findMany();
  const idAnimals = animals.map((el) => {
    return { params: { slug: el.id.toString() } };
  });

  return {
    paths: idAnimals,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params!;

  const res = await prisma.animal.findMany({
    where: {
      id: String(slug),
    },
  });

  const filesAnimalsRefs = res.map((animal) => animal.photos);

  const updatedAnimals = await Promise.all(
    filesAnimalsRefs[0].map(async (path, index) => {
      const fileRef = ref(storage, path);
      const downloadUrl = await getDownloadURL(fileRef);

      return { downloadUrl };
    })
  );

  const dataAnimal = Array.from(res).map((el) => {
    if (el.publishedAt) {
      const dateFormatted = format(
        new Date(formatISO(el.publishedAt)),
        "dd/MM/yyyy HH:mm:ss"
      );

      return {
        ...el,
        publishedAt: dateFormatted,
        image: updatedAnimals,
      };
    }
    return el;
  });

  return {
    props: {
      dataAnimal,
    },
  };
};
