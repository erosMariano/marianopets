import { Footer } from "@/components/Footer";
import Sidebar from "@/components/pages/doador/Sidebar";
import { authValidate } from "@/utils/authUtils";
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { prisma } from "../../../lib/prisma";
import { format, formatISO } from "date-fns";
import CardAnimal from "@/components/pages/doador/CardAnimal";
import { api } from "../../../lib/axios";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toastActive } from "@/utils/toastComponent";
const inter = Inter({ subsets: ["latin"] });

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
  const [listAnimals, setListAnimals] = useState(dataAnimal);
  const [idsDeleted, setIdDeleted] = useState<string[]>([]);

  function handleDeletePet(id: string) {
    const listAnimalsUpdated = listAnimals.filter((animal) => animal.id !== id);
    setListAnimals(listAnimalsUpdated);
    setIdDeleted((prevState) => [...prevState, id]);
  }

  async function handleModifyData() {
    try {
      const res = await api.put("/upload", idsDeleted);
      if(res.status === 200){
        await toastActive({error: false, message: "Animal deletado"});
      }
    } catch (error) {
      await toastActive({error: true, message: "Erro ao deletar animal"});
    }
  }
  return (
    <>
      <ToastContainer />
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
        <Sidebar activeMenu="animais-cadastrados" />
        <div className="w-full">
          <div className="flex gap-3 items-start flex-col">
            {listAnimals.map(({ id, name, city, details, photos }) => (
              <CardAnimal
                setDeletePet={handleDeletePet}
                city={city}
                details={details}
                photos={photos}
                name={name}
                key={id}
                id={id}
              />
            ))}
          </div>
          <button
            onClick={handleModifyData}
            className="bg-black text-xl text-white p-2 rounded mt-4"
          >
            Salvar
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
