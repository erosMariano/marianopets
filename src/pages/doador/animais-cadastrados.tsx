import { Footer } from "@/components/Footer";
import { myFont } from "@/components/pages/Home/Hero";
import CardAnimal from "@/components/pages/doador/CardAnimal";
import Sidebar from "@/components/pages/doador/Sidebar";
import { authValidate } from "@/utils/authUtils";
import { toastActive } from "@/utils/toastComponent";
import { format, formatISO } from "date-fns";
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { api } from "../../../lib/axios";
import { prisma } from "../../../lib/prisma";
const inter = Inter({ subsets: ["latin"] });
import ConfusedCat from "../../assets/images/confusedCat.png";

interface PropsFormDoacao {
  id: string;
  email: string;
  name: string;
  phone: string;
}

interface AnimalCadastrado {
  dataAnimal: {
    id: string;
    name: string;
    city: string;
    details: string;
    tutorName: string;
    tutorEmail: string;
    tutorPhone: string;
    publishedAt: string;
    photos: string[];
    type: string;
    tutorId: string;
  }[];
}

function AnimaisCadastrados({ dataAnimal }: AnimalCadastrado) {
  const [listAnimal, setListAnimal] = useState(dataAnimal)
  const [idsDeleted, setIdDeleted] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  function handleDeletePet(id: string) {
    setIdDeleted((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((item) => item !== id);
      } else {
        return [...prevState, id];
      }
    });
  }

  async function handleModifyData() {
    if (listAnimal.length !== 0 && idsDeleted.length !== 0) {
      try {
        setIsSaving(true);
        const res = await api.delete("/upload", {
          params: {
            ids: idsDeleted,
          },
        });
        if (res.status === 200) {
          await toastActive({ error: false, message: "Animal deletado" });
          setIsSaving(false);
          updateListedAnimal()
          setIdDeleted([]);
          
        }
      } catch (error) {
        await toastActive({ error: true, message: "Erro ao deletar animal" });
      }
    } else {
      await toastActive({ error: true, message: "Sem registros para deletar" });
    }
  }

  function updateListedAnimal(){
    const updateListFilter = listAnimal.filter((el, index) => el.id !== idsDeleted[index])
    setListAnimal(updateListFilter)
  }
  return (
    <>
      <ToastContainer />
      <Head>
        <title>Mariano Pets - Animais cadastrados</title>
        <meta
          name="description"
          content="Encontre seu companheiro perfeito para adoção no nosso site de adoção de animais. Temos cães, gatos e outros animais em busca de um lar amoroso. Visite-nos hoje para encontrar o amigo peludo ideal!"
        />
      </Head>
      <main
        className={`${inter.className} flex flex-grow mt-10 lg:mt-20 justify-between w-full max-w-[1312px] mx-auto px-4 gap-6`}
      >
        <Sidebar activeMenu="animais-cadastrados" />
        <div className="w-full">
          <div className="flex gap-3 items-start flex-col">
            {listAnimal.length >= 1 ? (
              listAnimal.map(({ id, name, city, details, photos }) => (
                <CardAnimal
                  setDeletePet={handleDeletePet}
                  city={city}
                  details={details}
                  photos={photos}
                  name={name}
                  key={id}
                  id={id}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center w-full">
                <p className={`${myFont.className} text-dark-blue text-2xl`}>
                  Nenhum animal Cadastrado.
                </p>
                <div className="relative w-[300px] h-[300px]">
                  <Image
                    alt=""
                    src={ConfusedCat}
                    width={300}
                    height={300}
                    quality={100}
                    priority
                  />
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleModifyData}
            disabled={isSaving}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 transition-all block ml-auto mt-8 disabled:cursor-not-allowed disabled:bg-purple-950"
          >
            {isSaving ? "Salvando" : "Salvar"}
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AnimaisCadastrados;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { props } = await authValidate(context);

  if (props === undefined || !context.req) {
    return {
      redirect: {
        destination: "/login", //
        permanent: false,
      },
    };
  }

  const people: PropsFormDoacao = props?.people;

  const res = await prisma.animal.findMany({
    where: {
      tutorId: people.id,
    },
  });

  if (!res) {
    return {
      props: {},
    };
  }

  const dataAnimal = Array.from(res).map((el) => {
    if (el.publishedAt) {
      const dateFormatted = format(
        new Date(formatISO(el.publishedAt)),
        "dd/MM/yyyy HH:mm:ss"
      );
      return {
        ...el,
        publishedAt: dateFormatted,
      };
    }
    return el;
  });

  return {
    props: {
      dataAnimal: dataAnimal,
    },
  };
};
