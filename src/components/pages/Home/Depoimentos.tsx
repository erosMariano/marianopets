import localFont from "next/font/local";
const myFont = localFont({ src: "../fonts/MADE_Gentle.otf" });
import Depoimento1 from "../../../assets/images/depoimento1.png";
import Arrow from "../../../assets/images/icons/arrow-prev.svg";

import Image from "next/image";
export function Depoimentos() {
  return (
    <section className="mt-20" id="depoimentos">
      <div className="max-w-[1312px] mx-auto px-4">
        <h2 className={`${myFont.className} text-4xl mb-10 md:mb-14 text-dark-text`}>
          Depoimentos
        </h2>

        <div className="flex items-start justify-between bg-[#FFF0E3] shadow-md px-6 py-10 md:py-20 rounded-[30px]">
          <div className="w-[685px]">
            <p className="text-base md:text-xl text-light-text font-semibold">
              Adotar o meu gatinho foi a melhor decisão que já tomei! Ele é um
              companheiro fiel, sempre me acompanhando pela casa e me dando
              muito amor e carinho. É incrível como um bichinho pode mudar tanto
              a nossa vida. Além disso, saber que dei uma nova chance a um
              animalzinho que precisava de um lar me enche de gratidão e
              felicidade. Recomendo a todos que pensem em adotar um pet,
              especialmente um gato, que são animais independentes e cheios de
              personalidade. A minha vida nunca mais será a mesma desde que ele
              chegou.
            </p>

            <div className="mt-6 flex justify-between ">
              <h4 className={`${myFont.className} text-lg text-dark-text`}>
                ~ Rafaela Ferreira
              </h4>
              <div className="gap-6 flex">
                <button className="px-3 bg-white rounded-full shadow-sm">
                  <Image src={Arrow} alt="Arrow" />
                </button>
                <button className="px-3 bg-white rounded-full shadow-sm">
                  <Image src={Arrow} alt="Arrow" className="rotate-180" />
                </button>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <Image src={Depoimento1} height={400} alt="Foto da Rafaela Ferreira" />
          </div>
        </div>
      </div>
    </section>
  );
}
