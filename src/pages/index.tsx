import { Adote } from "@/components/pages/Home/Adote";
import { Depoimentos } from "@/components/pages/Home/Depoimentos";
import { Hero } from "@/components/pages/Home/Hero";
import { NosAjudar } from "@/components/pages/Home/NosAjudar";
import { NossaTarefa } from "@/components/pages/Home/NossaTarefa";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={inter.className}>
      <Hero />
      <NosAjudar />
      <NossaTarefa />
      <Adote />
      <Depoimentos />
    </main>
  );
}
