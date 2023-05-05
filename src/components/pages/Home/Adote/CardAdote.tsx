import localFont from "next/font/local";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
const myFont = localFont({ src: "../../fonts/MADE_Gentle.otf" });

interface CardAdote {
  animalInfo: {
    title: string;
    url: string;
    image: StaticImageData;
    altImage: string;
  };
  isSmall?: boolean;
}
export function CardAdote({
  animalInfo: { altImage, image, title, url },
  isSmall,
}: CardAdote) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute flex items-center flex-col">
        <h3
          className={`${myFont.className} ${
            isSmall ? "text-2xl lg:text-2xl" : "text-2xl lg:text-4xl"
          } mb-4 text-white`}
        >
          {title}
        </h3>
        <Link
          href={`${url}`}
          className={`transition border rounded border-white font-bold hover:bg-white hover:text-dark-text flex items-center justify-center text-white ${
            isSmall ? "w-40 h-10" : "w-40 h-10 lg:w-52 lg:h-12"
          }`}
        >
          Ver Lista
        </Link>
      </div>
      <Image src={image} alt={altImage} className="rounded-3xl" />
    </div>
  );
}
