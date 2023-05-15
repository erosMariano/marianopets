import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

import Animal from "../assets/images/adote-cao.png";
import Animal2 from "../assets/images/portrait-adorable-cat.png";
import Animal3 from "../assets/images/beagles-filhotes-bocejando.jpg";

import Animal4 from "../assets/images/models/04-09_gato_SITE.webp";
import Animal5 from "../assets/images/models/2098203-gato-malhado-prateado-sentado-no-fundo-verde-gratis-foto.jpg";
import Animal6 from "../assets/images/models/beagles-filhotes-bocejando.jpg";
import Animal7 from "../assets/images/models/download.jpg";
import Animal8 from "../assets/images/models/feche-o-gato-fofo-dentro-de-casa.jpg";
import Animal9 from "../assets/images/models/gato-e-mamifero-entenda-mais-sobre-a-especie.webp";

import Image, { StaticImageData } from "next/image";
import { api } from "../../lib/axios";
import Link from "next/link";
import { convertStringInSlug } from "@/utils/convertStringInSlug";
import ButtonFilter from "@/components/ButtonFilter";

interface AnimalContent {
  imageUrl: string | StaticImageData;
  type: "dog" | "cat" | "bird" | "fish" | "rodent" | "reptile";
  name: string;
  localization: string;
}
function NossoPets() {
  // const [imagesFromAPI, setImagesFromAPI] = useState([]);

  // useEffect(() => {
  //   async function getImages() {
  //     const { data } = await api.get("/upload");
  //     setImagesFromAPI(data.urls);
  //   }
  //   getImages();
  // }, []);

  const [listItemFilter, setListItemFilter] = useState([
    { type: "all", name: "Todos animais", active: true },
    { type: "dog", name: "Cachorro", active: false },
    { type: "cat", name: "Gato", active: false },
    { type: "bird", name: "Pássaro", active: false },
    { type: "fish", name: "Peixe", active: false },
    { type: "rodent", name: "Roedor", active: false },
    { type: "reptile", name: "Réptil", active: false },
  ]);

  const [itemActiveFilter, setItemActiveFilter] = useState(0);

  function filterActive(indexElement: number) {
    setListItemFilter((prevState) => {
      return prevState.map((item, index) => {
        if (index === indexElement) {
          return { ...item, active: !item.active };
        } else {
          return { ...item, active: false };
        }
      });
    });

    setItemActiveFilter(indexElement);
  }

  const listAnimals: AnimalContent[] = [
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
  ];

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
        className={`${inter.className} min-h-[70vh] mt-20 justify-between w-full max-w-[1312px] mx-auto px-4`}
      >
        <div className="flex justify-center items-center gap-8 mb-8">
          {listItemFilter.map(({ name, active, type }, index) => {
            return (
              <ButtonFilter
                name={name}
                active={active}
                key={index}
                indexElement={index}
                activeItemFunc={filterActive}
              />
            );
          })}
        </div>

        {filteredAnimals.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {filteredAnimals.map((el, index) => {
              return (
                <Link
                  href={`adocao/${convertStringInSlug(el.name)}`}
                  key={index}
                  className="flex flex-col relative w-[300px] overflow-hidden"
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
        ) : (
          <p className="text-center">Nenhum animal encontrado.</p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default NossoPets;
