import React from "react";

import Cats from "../../../assets/images/cats-ajudar.png";
import Dogs from "../../../assets/images/dog-ajudar.png";
import Image from "next/image";

import localFont from "next/font/local";
const myFont = localFont({ src: "../fonts/MADE_Gentle.otf" });

export function NosAjudar() {
  return (
    <section>
      <div className="flex gap-5 flex-col md:flex-row max-w-[1312px] mx-auto px-4 py-20 border mt-10 lg:mt-20 border-b-0 border-x-0 border-t-gray-300">
        <div className="hidden md:block">
          <Image src={Dogs} alt="" />
        </div>

        <div className="text-center w-full">
          <span className="font-semibold text-light-text mb-4 block">
            Você pode nos ajudar!
          </span>
          <h2 className={`${myFont.className} text-dark-text text-2xl md:text-3xl md:px-6`}>
            Encontre o seu novo companheiro e descubra a alegria de dar e
            receber amor incondicional. Adote agora!
          </h2>
        </div>

        <div>
          <Image src={Cats} alt="" className="mx-auto"/>
        </div>
      </div>
    </section>
  );
}
