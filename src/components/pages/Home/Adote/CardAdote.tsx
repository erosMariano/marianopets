import localFont from "next/font/local";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";
const myFont = localFont({ src: "../../fonts/MADE_Gentle.otf" });

interface CardAdote {
  animalInfo: {
    title: string;
    image: StaticImageData | string;
    altImage: string;
    type: string;
  };
  isSmall?: boolean;
}
export function CardAdote({
  animalInfo: { altImage, image, title, type },
  isSmall,
}: CardAdote) {
  const route = useRouter();

  function handleCardAdote() {
    localStorage.setItem("tag-pet", type);
    route.push("/quero-adotar");
  }
  return (
    <div
      className="relative flex items-center justify-center"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="absolute flex items-center flex-col">
        <h3
          className={`${myFont.className} ${
            isSmall ? "text-2xl lg:text-2xl" : "text-2xl lg:text-4xl"
          } mb-4 text-white`}
        >
          {title}
        </h3>
        <button
          onClick={handleCardAdote}
          className={`transition border rounded border-white font-bold hover:bg-white hover:text-dark-text flex items-center justify-center text-white ${
            isSmall ? "w-40 h-10" : "w-40 h-10 lg:w-52 lg:h-12"
          }`}
        >
          Ver Lista
        </button>
      </div>
      <Image src={image} alt={altImage} className="rounded-3xl" />
    </div>
  );
}
