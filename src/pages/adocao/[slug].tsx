import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

import AnimalImage from "../../assets/images/beagles-filhotes-bocejando.jpg";
import AnimalImage2 from "../../assets/images/adote-roedor.png";
import AnimalImage3 from "../../assets/images/adote-reptil.png";

import Image from "next/image";
import iconLocation from "../../assets/images/icons/location.svg";
import iconPeople from "../../assets/images/icons/people.svg";
import { myFont } from "@/components/pages/Home/Hero";
import ShareIcon from "../../assets/images/icons/share.svg";
import ArrowButton from "../../assets/images/icons/arrow-button.svg";
import Carousel from "@/components/Carousel";
import PopupAdotar from "@/components/pages/PopupAdotar";
import { useState } from "react";

function Animal() {
  const slides = [
    {
      photoAnimal: AnimalImage,
      id: 0,
    },
    {
      photoAnimal: AnimalImage2,
      id: 1,
    },
    {
      photoAnimal: AnimalImage3,
      id: 2,
    },
  ];

  const [openModal, setOpenModal] = useState(false);

  function changeModal(){
    setOpenModal(prevState => !prevState)
  }
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

      <PopupAdotar email="erosmariano1@gmail.com" isOpen={openModal} phone="11956649471" setIsOpen={changeModal}/>
      <main
        className={`${inter.className} flex-grow pb-10 mt-10 lg:mt-20 justify-between w-full max-w-[1312px] mx-auto px-4`}
      >
        <div className="flex justify-between gap-8 flex-col md:flex-row">
          <div className="w-full md:w-[500px]">
            <Carousel slides={slides} />
          </div>

          <div className="flex w-full md:w-[600px] flex-col">
            <div className="flex items-center gap-4">
              <h2 className={`${myFont.className} text-dark-text text-4xl`}>
                Sol bebê fêmea
              </h2>
              <button>
                {" "}
                <Image
                  src={ShareIcon}
                  width={24}
                  height={24}
                  alt="localização share"
                />
              </button>
            </div>

            <div className="my-4 flex flex-col gap-2">
              <div className="flex gap-2">
                <Image
                  src={iconLocation}
                  width={24}
                  height={24}
                  alt="localização icone"
                />

                <span className="text-light-text text-base">
                  Está em São Paulo, São Paulo
                </span>
              </div>

              <div className="flex gap-2">
                <Image
                  src={iconPeople}
                  width={24}
                  height={24}
                  alt="Icone publicado"
                />
                <span className="text-light-text text-base">
                  Publicado por <strong>Marcia Helena</strong> em 16/05/2023
                </span>
              </div>

              <button onClick={() => setOpenModal(true)} className="w-full my-6 gap-3 transition-all p-3 rounded-full font-semibold text-white  flex items-center justify-center bg-[#8C62EC] hover:bg-purple-700">
                Entrar em contato
                <Image src={ArrowButton} alt="" />
              </button>

              <div>
                <h2
                  className={`${myFont.className} text-dark-text text-2xl mt-4 mb-2`}
                >
                  A história de Sol bebê fêmea
                </h2>
                <p className="text-light-text text-lg">
                  Essa é a Sol, uma linda bebê estopinha. Ela tem
                  aproximadamente 3 meses. Como todo filhote ela é muito
                  brincalhona e dócil. Não sei o tamanho que vai ficar pq foi
                  resgatada da rua. Ela já está castrada e vermifugada, as
                  vacinas estão em andamento. Se quiser alegria na casa e uma
                  grande companheira, adote a Sol. Entrar em contato por e-mail:
                  marciahelenasp@hotmail.com Ou via mensagem no WhatsApp (11)
                  94980.7095 Obrigada
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Animal;
