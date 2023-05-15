import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Adote } from "@/components/pages/Home/Adote";
import { Depoimentos } from "@/components/pages/Home/Depoimentos";
import { Hero } from "@/components/pages/Home/Hero";
import { NosAjudar } from "@/components/pages/Home/NosAjudar";
import { NossaTarefa } from "@/components/pages/Home/NossaTarefa";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Mariano Pets - Encontre seu companheiro perfeito para adoção
        </title>
        <meta
          name="description"
          content="Encontre seu companheiro perfeito para adoção no nosso site de adoção de animais. Temos cães, gatos e outros animais em busca de um lar amoroso. Visite-nos hoje para encontrar o amigo peludo ideal!"
        />
      </Head>
      <Header />
      <main className={inter.className}>
        <Hero />
        <NosAjudar />
        <NossaTarefa />
        <Adote />
        <Depoimentos />
      </main>
      <Footer />
    </>
  );
}
