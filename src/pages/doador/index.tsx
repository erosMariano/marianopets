import Head from "next/head";
import React from "react";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import Sidebar from "@/components/pages/doador/Sidebar";
import { myFont } from "@/components/pages/Home/Hero";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { authValidate } from "@/utils/authUtils";
const inter = Inter({ subsets: ["latin"] });

interface PropsFormDoacao {
  people: {
    id: string;
    email: string;
    name: string;
    phone: string;
  };
}

function DoadorHome({ people }: PropsFormDoacao) {
  
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
                Olá, Eros dos Santos Mariano
              </span>
              <span className="text-light-text font-medium">
                Bem-vindo ao nosso Dashboard de Cadastro de Animais para Doação!
              </span>
            </div>

            <Link
              href="/doador/animais-cadastrados"
              className="mt-9 w-full h-48 text-2xl flex items-center justify-center text-center font-semibold text-gray-800 bg-white shadow-sm rounded-3xl"
            >
              04 Animais cadastrados
            </Link>
          </div>
        </main>
        <Footer />
    </>
  );
}

export default DoadorHome;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await authValidate(context);
};
