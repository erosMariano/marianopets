import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

import Animal from "../assets/images/adote-cao.png";
import Animal2 from "../assets/images/portrait-adorable-cat.png";

import Image, { StaticImageData } from "next/image";
import { api } from "../../lib/axios";
import Link from "next/link";
import { convertStringInSlug } from "@/utils/convertStringInSlug";
import ConfusedCat from "../assets/images/confusedCat.png";
import { myFont } from "@/components/pages/Home/Hero";
import FilterQueroAdotar from "@/components/pages/quero-adotar/Filter";

interface AnimalContent {
  imageUrl: string | StaticImageData;
  type: "dog" | "cat" | "bird" | "fish" | "rodent" | "reptile";
  name: string;
  localization: string;
}
interface ListItemFilter {
  type: string;
  name: string;
  active: boolean;
}

function NossoPets() {
  const [imagesFromAPI, setImagesFromAPI] = useState([]);

  // useEffect(() => {
  //   async function getImages() {
  //     const { data } = await api.get("/upload");
  //     setImagesFromAPI(data.urls);
  //   }
  //   getImages();
  // }, []);

  // useEffect(() =>{
  //   console.log(imagesFromAPI)
  // },[imagesFromAPI])
  const [itemActiveFilter, setItemActiveFilter] = useState(0);
  const [listItemFilter, setListItemFilter] = useState<ListItemFilter[]>([
    { type: "all", name: "Todos animais", active: true },
    { type: "dog", name: "Cachorro", active: false },
    { type: "cat", name: "Gato", active: false },
    { type: "bird", name: "Pássaro", active: false },
    { type: "fish", name: "Peixe", active: false },
    { type: "rodent", name: "Roedor", active: false },
    { type: "reptile", name: "Réptil", active: false },
  ]);

  const [listAnimals, setListAnimals] = useState<AnimalContent[]>([
    {
      imageUrl: Animal,
      type: "dog",
      name: "Cachorro fábio",
      localization: "Embu-Guaçu, SP",
    },
    {
      imageUrl: Animal2,
      type: "cat",
      name: "Gato fabricio",
      localization: "Embu-Guaçu, SP",
    },
    {
      imageUrl: Animal2,
      type: "cat",
      name: "Gato fabricio",
      localization: "Embu-Guaçu, SP",
    },

    {
      imageUrl: Animal2,
      type: "cat",
      name: "Gato fabricio",
      localization: "Embu-Guaçu, SP",
    },
  ]);

  const filteredAnimals = listAnimals.filter((el) => {
    return (
      listItemFilter[itemActiveFilter].type === "all" ||
      el.type === listItemFilter[itemActiveFilter].type
    );
  });

  return (
    <>
      <Head>
        <title>Mariano Pets - Nossos Pets</title>
        <meta
          name="description"
          content="Encontre seu companheiro perfeito para adoção no nosso site de adoção de animais. Temos cães, gatos e outros animais em busca de um lar amoroso. Visite-nos hoje para encontrar o amigo peludo ideal!"
        />
      </Head>
      <Header />
      <main
        className={`${inter.className} flex-grow mt-10 lg:mt-20 justify-between w-full max-w-[1312px] mx-auto px-4`}
      >
        <FilterQueroAdotar
          defineItemActiveFilter={setItemActiveFilter}
          setListItemFilter={setListItemFilter}
          listItemFilter={listItemFilter}
        />

        {filteredAnimals.length > 0 ? (
          <div className="flex flex-wrap gap-[26px]">
            {filteredAnimals.map((el, index) => {
              return (
                <Link
                  href={`adocao/${convertStringInSlug(el.name)}`}
                  key={index}
                  className="flex flex-col relative w-full  md:w-[48%] lg:w-[300px] overflow-hidden shadow-sm hover:shadow-md rounded-2xl    transition-all"
                >
                  <>
                    <Image
                      src={el.imageUrl}
                      alt=""
                      className="w-full h-[200px] object-cover rounded-t-2xl"
                    />

                    <div className="shadow-sm bg-white p-5 rounded-b-2xl">
                      <p className="font-bold text-dark-text text-base">
                        {el.name}
                      </p>
                      <span className="font-normal text-xs text-light-text">
                        {el.localization}
                      </span>
                    </div>
                  </>
                </Link>
              );
            })}
          </div>
        ) : listAnimals.length >= 1 ? (
          <div className="flex flex-col items-center">
            <p className={`${myFont.className} text-dark-blue text-2xl`}>
              Nenhum animal encontrado.
            </p>
            <div className="relative w-[300px] h-[300px]">
              <Image alt="" src={ConfusedCat} width={300} height={300} quality={100} priority/>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="animate-pulse flex-row items-center flex justify-between w-full flex-wrap gap-[26px]">
              <div className="w-full md:w-[48%] h-[288px] lg:w-[300px] rounded-2xl bg-gray-300 block"></div>
              <div className="w-full md:w-[48%] h-[288px] lg:w-[300px] rounded-2xl bg-gray-300 block"></div>
              <div className="w-full md:w-[48%] h-[288px] lg:w-[300px] rounded-2xl bg-gray-300 block"></div>
              <div className="w-full md:w-[48%] h-[288px] lg:w-[300px] rounded-2xl bg-gray-300 block"></div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default NossoPets;
