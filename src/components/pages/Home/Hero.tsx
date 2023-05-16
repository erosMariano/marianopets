import Image from "next/image";
import ImageCat from "../../../assets/images/portrait-adorable-cat.png";
import ImageDog from "../../../assets/images/portrait-adorable-dog.png";

import localFont from "next/font/local";
export const myFont = localFont({ src: "../fonts/MADE_Gentle.otf" });

import ArrowButton from "../../../assets/images/icons/arrow-button.svg";
import PataIcon from "../../../assets/images/icons/pata.svg";
import Link from "next/link";

export function Hero() {
  return (
    <section className="mt-10 lg:mt-20">
      <div className="flex max-w-[1312px] mx-auto px-4 gap-20 relative flex-col lg:flex-row h-auto">
        <Image src={PataIcon} alt="" className="absolute -z-10 hidden xl:block  xl:left-[-90px] top-[140px]" />
        <Image src={PataIcon} alt="" className="absolute -z-10 hidden xl:block   xl:left-[-40px] top-[100px]" />
        <Image src={PataIcon} alt="" className="absolute -z-10 hidden xl:block  xl:left-[0px] top-[50px]" />


        <Image src={PataIcon} alt="" className="absolute -z-10 hidden xl:block  xl:left-[484px] rotate-[-84deg]" />
        <Image src={PataIcon} alt="" className="absolute -z-10 hidden xl:block  xl:left-[484px] top-[205px] rotate-[-28deg]" />
        <Image src={PataIcon} alt="" className="absolute -z-10 hidden xl:block  xl:left-[284px] top-[262px]" />
        <Image src={PataIcon} alt="" className="absolute -z-10 hidden xl:block  xl:left-[641px] top-[331px] rotate-[-80deg]" />
        <Image src={PataIcon} alt="" className="absolute -z-10 hidden xl:block  xl:left-[678px] rotate-[20deg]" />

        <Image src={PataIcon} alt="" className="absolute -z-10 hidden xl:block  rotate-[-15deg] xl:right-[195px] top-[-44px]"  />
        <Image src={PataIcon} alt="" className="absolute -z-10 hidden xl:block  xl:right-0 bottom-0 rotate-[-50deg]"  />
        <Image src={PataIcon} alt="" className="absolute -z-10 hidden xl:block  xl:right-[150px] bottom-9 rotate-[-50deg]" /> 


        <div className="flex flex-col flex-1"> 
          <h1
            className={`${myFont.className} text-5xl lg:text-8xl text-dark-text mb-6 max-w-[660px]`}
          >
            Encha sua casa de amor
          </h1>
          <p className="font-semibold text-light-text max-w-sm">
            Descubra a felicidade de ter um pet e transforme sua vida para
            sempre.
          </p>
          <Link href={"/quero-adotar"} className="lg:w-fit mt-9 bg-[#8C62EC] hover:bg-purple-700 transition-all px-6 py-3 flex gap-3 items-center justify-center rounded-full text-base text-white font-medium">
            Adote agora
            <Image src={ArrowButton} alt="" />
          </Link>
        </div>

        <div className="flex gap-2 justify-center w-auto items-start xl:w-1/3 lg:w-auto">
          <Image src={ImageDog} alt="" quality={100} />
          <Image src={ImageCat} alt="" quality={100} />
        </div>
      </div>
    </section>
  );
}
