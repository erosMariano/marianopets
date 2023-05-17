import Image from "next/image";
import React, { useEffect } from "react";
import EmailIcon from "../../assets/images/icons/email.svg";
import WhatsAppIcon from "../../assets/images/icons/phone.svg";
import { myFont } from "./Home/Hero";

interface PopupAdotarProps {
  isOpen: boolean;
  email: string;
  phone: string;
  setIsOpen: () => void;
}
function PopupAdotar({ email, isOpen, phone, setIsOpen }: PopupAdotarProps) {
  return (
    <div
      className={`w-full transition-all fixed top-0 left-0 h-screen bg-black/25 px-4 flex items-center justify-center z-20 opacity-0${
        isOpen
          ? "opacity-1 cursor-pointer pointer-events-auto"
          : " cursor-none pointer-events-none"
      }`}
    >
      <div className="bg-white p-6 rounded-3xl max-w-lg">
        <h2
          className={`text-2xl font-bold text-dark-text mb-2 ${myFont.className}`}
        >
          Faça parte dessa linda jornada!
        </h2>
        <p className="text-light-text text-base mb-2">
          Esse pet está pronto para ser seu fiel amigo. Entre em contato com o
          protetor para adotar:
        </p>

        <div>
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-light-text">
              <Image src={EmailIcon} width={24} height={24} alt="Icon email" />{" "}
              {email}
            </span>
            <span className="flex items-center gap-2 text-light-text">
              <Image
                src={WhatsAppIcon}
                width={24}
                height={24}
                alt="Icon email"
              />{" "}
              {phone}
            </span>
          </div>
        </div>

        <button
          onClick={setIsOpen}
          className="mt-4 border text-white font-semibold px-4 py-2 rounded-lg bg-orange-400 hover:bg-orange-500 transition-all"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default PopupAdotar;
