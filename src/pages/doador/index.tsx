import Head from "next/head";
import React from "react";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import Sidebar from "@/components/pages/doador/Sidebar";
import { myFont } from "@/components/pages/Home/Hero";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { authValidate } from "@/utils/authUtils";
import { prisma } from "../../../lib/prisma";
import { format, formatISO } from "date-fns";
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

  people: {
    id: string;
    email: string;
    name: string;
    phone: string;
  };
}

function DoadorHome({ dataAnimal, people }: AnimalCadastrado) {
  function convertFirstLetter(name: string) {
    const newString = String(name)
      .toLowerCase()
      .split(" ")
      .map((elText) => {
        return elText.charAt(0).toUpperCase() + elText.slice(1);
      })
      .join(" ");

    return newString;
  }

  return (
    <>
      <Head>
        <title>Mariano Pets - Dashboard</title>
        <meta
          name="description"
          content="Encontre seu companheiro perfeito para adoção no nosso site de adoção de animais. Temos cães, gatos e outros animais em busca de um lar amoroso. Visite-nos hoje para encontrar o amigo peludo ideal!"
        />
      </Head>
      <main
        className={`${inter.className} flex flex-grow mt-10 lg:mt-20 justify-between w-full max-w-[1312px] mx-auto px-4 gap-6`}
      >
        <Sidebar activeMenu="home" />

        <div className="w-full">
          <div className="flex flex-col">
            <span className={`${myFont.className} text-dark-text text-2xl`}>
              Olá, <span>{convertFirstLetter(people.name)}</span>
            </span>
            <span className="text-light-text font-medium">
              Bem-vindo ao nosso Dashboard de Cadastro de Animais para Doação!
            </span>
          </div>

          <Link
            href="/doador/animais-cadastrados"
            className="mt-9 w-full h-48 text-2xl flex items-center justify-center text-center font-semibold text-gray-800 bg-white shadow-sm rounded-3xl"
          >
            {String(dataAnimal.length).padStart(2, "0")} Animais cadastrados
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default DoadorHome;

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
      people: people,
    },
  };
};
