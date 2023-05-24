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
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Head>
        <title>Mariano Pets - Encontre seu companheiro perfeito para adoção</title>
        <meta
          name="description"
          content="Encontre seu companheiro perfeito para adoção no nosso site de adoção de animais. Temos cães, gatos e outros animais em busca de um lar amoroso. Visite-nos hoje para encontrar o amigo peludo ideal!"
        />

        {/* Meta tags Open Graph (OG) */}
        <meta property="og:title" content={`Mariano Pets - Encontre seu companheiro perfeito para adoção`} />
        <meta property="og:description" content="Encontre seu companheiro perfeito para adoção no nosso site de adoção de animais. Temos cães, gatos e outros animais em busca de um lar amoroso. Visite-nos hoje para encontrar o amigo peludo ideal!" />
        <meta property="og:image" content='https://marianopets.vercel.app/assets/images/banner-search.jpg' />
        <meta property="og:url" content={`https://marianopets.vercel.app/`} />
        <meta property="og:type" content="website" />
      </Head>

      <Header />
      <main className={`overflow-x-hidden ${inter.className}`}>
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
