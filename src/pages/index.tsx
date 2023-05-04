import { Hero } from "@/components/pages/Home/Hero";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  return (
    <main className={inter.className}>
      <Hero />
    </main>
  );
}
