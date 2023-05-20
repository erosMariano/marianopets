import { Footer } from "@/components/Footer";
import Sidebar from "@/components/pages/doador/Sidebar";
import { authValidate } from "@/utils/authUtils";
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { prisma } from "../../../lib/prisma";
import { format, formatISO } from "date-fns";
import CardAnimal from "@/components/pages/doador/CardAnimal";
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
        <Sidebar activeMenu="animais-cadastrados" />
        <div className="w-full flex gap-3 items-start">
          {dataAnimal.map(({ id, name, city, details, photos }) => (
            <CardAnimal
              city={city}
              details={details}
              photos={photos}
              name={name}
              key={id}
              id={id}
            />
          ))}
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
