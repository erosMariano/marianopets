import localFont from "next/font/local";
import { StaticImageData } from "next/image";
const myFont = localFont({ src: "../../fonts/MADE_Gentle.otf" });

import AdoteDog from "../../../../assets/images/adote-cao.png";
import AdoteCat from "../../../../assets/images/adote-cat.png";
import AdoteBird from "../../../../assets/images/adote-passaro.png";
import AdoteFish from "../../../../assets/images/adote-peixe.png";
import AdoteReptil from "../../../../assets/images/adote-reptil.png";
import AdoteRoedor from "../../../../assets/images/adote-roedor.png";
import { CardAdote } from "./CardAdote";

interface AdoteProps {
  title: string;
  image: StaticImageData;
  altImage: string;
  type: string
}

export function Adote() {
  const adoteAnimalsContent: AdoteProps[] = [
    {
      altImage: "Imagem de adote um cão",
      image: AdoteDog,
      title: "Adote um Cachorro",
      type: "dog"
    },
    {
      altImage: "Adote um Gato",
      image: AdoteCat,
      title: "Adote um Gato",
      type: "cat"

    },
    {
      altImage: "Adote um Peixe",
      image: AdoteFish,
      title: "Adote um Peixe",
      type: "fish"

    },
    {
      altImage: "Adote um Réptil",
      image: AdoteReptil,
      title: "Adote um Réptil",
      type: "reptile"
    },
    {
      altImage: "Adote um Pássaro",
      image: AdoteBird,
      title: "Adote um Pássaro",
      type: "bird"
    },
    {
      altImage: "Adote um  Roedor",
      image: AdoteRoedor,
      title: "Adote um  Roedor",
      type: "rodent"
    },
  ];
  return (
    <section className="mt-20" id="adote-pet">
      <div className="flex max-w-[1312px] mx-auto px-4 flex-col">
        <h2 className={`${myFont.className} text-4xl mb-6 lg:mb-14 text-dark-text`}>
          Adote um pet
        </h2>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-5">
            {adoteAnimalsContent.slice(0, 2).map((card) => {
              const data = {
                altImage: card.altImage,
                image: card.image,
                title: card.title,
                type: card.type
              };
              return <CardAdote animalInfo={data} key={card.title} />;
            })}
          </div>

          <div className="flex-col lg:flex-row lg:flex gap-5">
            <div className="flex gap-5 flex-col md:flex-row">
              {adoteAnimalsContent.slice(2, 4).map((card) => {
                const data = {
                  altImage: card.altImage,
                  image: card.image,
                  title: card.title,
                  type: card.type
                };
                return <CardAdote animalInfo={data} isSmall key={card.title} />;
              })}
            </div>

            <div className="flex gap-5 mt-5 flex-col md:flex-row">
              {adoteAnimalsContent.slice(4).map((card) => {
                const data = {
                  altImage: card.altImage,
                  image: card.image,
                  title: card.title,
                  type: card.type
                };
                return <CardAdote animalInfo={data} isSmall key={card.title} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
