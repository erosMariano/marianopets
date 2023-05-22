import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import Image, { StaticImageData } from "next/image";
import { api } from "../../lib/axios";
import Link from "next/link";
import { convertStringInSlug } from "@/utils/convertStringInSlug";
import ConfusedCat from "../assets/images/confusedCat.png";
import { myFont } from "@/components/pages/Home/Hero";
import FilterQueroAdotar from "@/components/pages/quero-adotar/Filter";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import storage from "@/config/firebase.config";

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

interface AnimalData {
  name: string;
  city: string;
  details: string;
  photos: string[];

  tutorId?: string;
  tutorName: string;
  tutorEmail: string;
  tutorPhone: string;
  publishedAt: Date;
  type: string;
  CEP: string;
  state: string;

  image: string[];
}

function NossoPets() {
  const [animalsData, setAnimalsData] = useState<AnimalData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const {
        data: { animals },
      } = await api.get("/getAllAnimals");
  
      const myAnimals = animals as AnimalData[];
      const filesAnimalsRefs = myAnimals.map((animal) => animal.photos[0]);
      await fetchImages(filesAnimalsRefs, myAnimals);
    }
  
    async function fetchImages(items: string[], animals: AnimalData[]) {
      const updatedAnimals = await Promise.all(
        items.map(async (path, index) => {
          const fileRef = ref(storage, path);
          const downloadURL = await getDownloadURL(fileRef);
  
          return {
            ...animals[index],
            image: [downloadURL],
          };
        })
      );
  
      setAnimalsData(updatedAnimals);
    }
  
    fetchData();
  }, []);

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

  const filteredAnimals = animalsData.filter((el) => {
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

        {filteredAnimals.length >= 1 ? (
          <div className="flex flex-wrap gap-[26px]">
            {filteredAnimals.map((el, index) => {
              return (
                <Link
                  href={`adocao/${convertStringInSlug(el.name)}`}
                  key={index}
                  className="flex flex-col relative w-full  md:w-[48%] lg:w-[300px] overflow-hidden shadow-sm hover:shadow-md rounded-2xl    transition-all"
                >
                  <>
                    {!filteredAnimals[index].image  ? (
                      <div className="animate-pulse flex-row items-center flex justify-between w-full flex-wrap gap-[26px]">
                        <div className="w-full h-[200px] bg-gray-300 block"></div>
                      </div>
                    ) : (
                      <Image
                        src={filteredAnimals[index].image[0]}
                        alt=""
                        height={200}
                        width={200}
                        className="w-full h-[200px] object-cover rounded-t-2xl"
                      />
                    )}

                    <div className="shadow-sm bg-white p-5 rounded-b-2xl">
                      <p className="font-bold text-dark-text text-base">
                        {el.name}
                      </p>
                      <span className="font-normal text-xs text-light-text">
                        {el.city} - {el.state}
                      </span>
                    </div>
                  </>
                </Link>
              );
            })}
          </div>
        ) : animalsData.length >= 1 ? (
          <div className="flex flex-col items-center">
            <p className={`${myFont.className} text-dark-blue text-2xl`}>
              Nenhum animal encontrado.
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
