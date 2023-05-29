import Image from "next/image";
import Logo from "../assets/images/logo.svg";
import localFont from "next/font/local";
const myFont = localFont({ src: "./pages/fonts/MADE_Gentle.otf" });

export function Footer() {
  return (
    <footer className="mt-20 py-4 bg-[#FFF0E3] flex gap-6 items-center justify-center">
      <span className={`${myFont.className} text-dark-text`}>Feito por:</span>
      <div className="w-32">
        <Image src={Logo} alt="Logo mariano pets" />
      </div>
    </footer>
  );
}
