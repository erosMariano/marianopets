import localFont from "next/font/local";
const myFont = localFont({ src: "../fonts/MADE_Gentle.otf" });
import Depoimento1 from "../../../assets/images/depoimento1.png";
import Depoimento2 from "../../../assets/images/Depoimento2.png";
import Depoimento3 from "../../../assets/images/Depoimento3.png";

import Arrow from "../../../assets/images/icons/arrow-prev.svg";

import Image from "next/image";
import React, { useState } from "react";
export function Depoimentos() {
  const [currentDepoimento, setCurrentDepoimento] = useState(0);

  const depoimentos = [
    {
      description: `Adotar o meu gatinho foi a melhor decisão que já tomei! Ele é um companheiro fiel, sempre me acompanhando pela casa e me dando muito amor e carinho. É incrível como um bichinho pode mudar tanto a nossa vida. Além disso, saber que dei uma nova chance a um animalzinho que precisava de um lar me enche de gratidão e felicidade. Recomendo a todos que pensem em adotar um pet, especialmente um gato, que são animais independentes e cheios de personalidade. A minha vida nunca mais será a mesma desde que ele chegou.`,
      nameUser: "Rafaela Ferreira",
      image: Depoimento1,
      id: 0,
    },
    {
      description: `A adoção do meu cachorro trouxe uma alegria imensa para a minha vida. Ele é extremamente brincalhão e carinhoso, e sempre está ao meu lado nos momentos bons e ruins. Ter um animal de estimação é uma responsabilidade, mas os benefícios superam qualquer dificuldade. Ver a felicidade e o amor incondicional que ele me proporciona diariamente é algo indescritível. Se você está pensando em adotar um pet, eu recomendo sem dúvidas!`,
      nameUser: "Carlos Silva",
      image: Depoimento2,
      id: 1,
    },
    {
      description: `Adotar um pet foi uma das melhores decisões que já tomei. Meu cãozinho trouxe uma energia positiva para minha vida e me ensinou o verdadeiro significado de amor e lealdade. É incrível como um animalzinho pode nos ensinar tanto sobre empatia e cuidado. Se você está pensando em adotar, vá em frente! Você estará dando uma chance a um ser vivo que merece um lar cheio de amor.`,
      nameUser: "Mariana Almeida",
      image: Depoimento3,
      id: 2,
    },
  ];

  function handleSetCurrentPlusDepoimento(index: number) {
    if (depoimentos[index]) {
      setCurrentDepoimento(index);
    } else {
      if(index === -1){
        setCurrentDepoimento(depoimentos.length - 1);
      }else{
        setCurrentDepoimento(0);
      }
    }
  }

  return (
    <section className="mt-20 pb-3" id="depoimentos">
      <div className="max-w-[1312px] mx-auto px-4">
        <h2
          className={`${myFont.className} text-4xl mb-10 md:mb-14 text-dark-text`}
        >
          Depoimentos
        </h2>

        <div className="relative flex items-start justify-between bg-[#FFF0E3] shadow-md px-6 py-10 md:py-20 rounded-[30px]">
          <div className="w-[685px]">
            <p className="text-base md:text-xl text-light-text font-semibold">
              {depoimentos[currentDepoimento].description}
            </p>

            <div className="mt-6 flex justify-between w-full flex-col gap-3 lg:flex-row lg:absolute bottom-7 lg:w-96">
              <h4 className={`${myFont.className} text-lg text-dark-text`}>
                ~ {depoimentos[currentDepoimento].nameUser}
              </h4>
              <div className="gap-6 flex justify-end lg:justify-start">
                <button
                  className="px-3 bg-white rounded-full shadow-sm disabled:opacity-70 disabled:bg-gray-200 disabled:cursor-not-allowed"
                  onClick={() =>
                    handleSetCurrentPlusDepoimento(
                      depoimentos[currentDepoimento].id - 1
                    )
                  }
                >
                  <Image src={Arrow} alt="Arrow" />
                </button>
                <button
                  className="px-3 bg-white rounded-full shadow-sm"
                  onClick={() =>
                    handleSetCurrentPlusDepoimento(
                      depoimentos[currentDepoimento].id + 1
                    )
                  }
                >
                  <Image src={Arrow} alt="Arrow" className="rotate-180" />
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <Image
              src={depoimentos[currentDepoimento].image}
              height={400}
              alt={`Foto da ${depoimentos[currentDepoimento].nameUser}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
