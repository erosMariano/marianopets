import React from "react";

import Cats from "../../../assets/images/cats-ajudar.png";
import Dogs from "../../../assets/images/dog-ajudar.png";
import Image from "next/image";

import localFont from "next/font/local";
const myFont = localFont({ src: "../fonts/MADE_Gentle.otf" });

export function NosAjudar() {
  return (
    <section>
      <div className="flex max-w-[1312px] mx-auto px-4 py-20 border mt-20 border-b-0 border-x-0 border-t-gray-300">
        <Image src={Dogs} alt="" />

        <div className="text-center">
          <span className="font-semibold text-light-text mb-4 block">Você pode nos ajudar!</span>
          <h2 className={`${myFont.className} text-dark-text text-3xl px-6`}>
            Encontre o seu novo companheiro e descubra a alegria de dar e
            receber amor incondicional. Adote agora!
          </h2>
        </div>

        <Image src={Cats} alt="" />
      </div>
    </section>
  );
}
