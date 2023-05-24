import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

import Carousel from "@/components/Carousel";
import { myFont } from "@/components/pages/Home/Hero";
import PopupAdotar from "@/components/pages/PopupAdotar";
import storage from "@/config/firebase.config";
import { getDownloadURL, ref } from "firebase/storage";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { prisma } from "../../../lib/prisma";
import ArrowButton from "../../assets/images/icons/arrow-button.svg";
import iconLocation from "../../assets/images/icons/location.svg";
import iconPeople from "../../assets/images/icons/people.svg";
import ShareIcon from "../../assets/images/icons/share.svg";

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
  };
}

function Animal({ dataAnimal }: AnimalProps) {
  const [openModal, setOpenModal] = useState(false);

  function changeModal() {
    setOpenModal((prevState) => !prevState);
  }

  const animalWithId = dataAnimal.image.map((image, index) => {
    const { downloadUrl } = image;
    return {
      id: index,
      photoAnimal: downloadUrl,
    };
  });


  async function handleShareAnimal(){
    try{
      await navigator.share({
        title: `Mariano Pets - ${dataAnimal.name}`,
        text: `Conheça esse adorável ${dataAnimal.type} para adoção! Venha conhecê-lo e dar um lar amoroso para esse animal.`,
        url: `https://marianopets.vercel.app/quero-adotar/${dataAnimal.id}`
      });
    }catch(error){
      console.log('Conteúdo compartilhado com sucesso!');
    }
  }
  return (
    <>
      <Head>
        <title>Mariano Pets - {dataAnimal.name}</title>
        <meta
          name="description"
          content="Encontre seu companheiro perfeito para adoção no nosso site de adoção de animais. Temos cães, gatos e outros animais em busca de um lar amoroso."
        />

        {/* Meta tags Open Graph (OG) */}
        <meta property="og:title" content={`Mariano Pets - ${dataAnimal.name}`} />
        <meta property="og:description" content="Encontre seu companheiro perfeito para adoção no nosso site de adoção de animais. Temos cães, gatos e outros animais em busca de um lar amoroso." />
        <meta property="og:image" content={dataAnimal.photos[0]} />
        <meta property="og:url" content={`https://marianopets.vercel.app/quero-adotar/${dataAnimal.id}`} />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <PopupAdotar
        email={dataAnimal.tutorEmail}
        isOpen={openModal}
        phone={dataAnimal.tutorPhone}
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
                {dataAnimal.name}
              </h2>
              <button onClick={handleShareAnimal}>
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
                  Está em {dataAnimal.city}, {dataAnimal.state}
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
                  Publicado por <strong>{dataAnimal.tutorName}</strong> em{" "}
                  {new Intl.DateTimeFormat("pt-br").format(new Date(dataAnimal.publishedAt))}
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
                  Descrição de {dataAnimal.name}
                </h2>
                <p className="text-light-text text-lg">{dataAnimal.details}</p>
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
  const idAnimals = animals.map((animal) => {
    return { params: { id: animal.id.toString() } };
  });

  return {
    paths: idAnimals,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const res = await prisma.animal.findUnique({
    where: {
      id: String(id),
    },
  });

  if (!res) {
    return {
      notFound: true,
    };
  }

  const filesAnimalsRefs = res.photos;

  const updatedAnimals = await Promise.all(
    filesAnimalsRefs.map(async (path, index) => {
      const fileRef = ref(storage, path);
      const downloadUrl = await getDownloadURL(fileRef);
      return { downloadUrl };
    })
  );

  const dataAnimal = {
    ...res,
    image: updatedAnimals,
  };

  return {
    props: {
      dataAnimal: JSON.parse(JSON.stringify(dataAnimal)),
    },
  };
};
