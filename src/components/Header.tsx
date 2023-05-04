import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo.svg";
import IconLogin from "../assets/images/icon-login.svg";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export function Header() {
  const [activeHeader, setActiveHeader] = useState(false);

  useEffect(() => {
    function teste() {
      if (window.scrollY > 50) {
        if (!activeHeader) {
          setActiveHeader(true);
        }
      } else {
        if (activeHeader) {
          setActiveHeader(false);
        }
      }
    }

    window.addEventListener("scroll", teste);
  }, [activeHeader]);

  return (
    <header
      className={`flex items-center transition-all ${inter.className} ${
        activeHeader ? "bg-white shadow-sm" : "transparent"
      } sticky top-0 py-4 z-10`}
    >
      <div className="flex items-center justify-between w-full max-w-[1312px] mx-auto px-4">
        <div className="flex items-center gap-10 ">
          <Image
            src={Logo}
            width={303}
            height={54.08}
            alt="Logo Mariano Pets"
          />

          <nav>
            <ul className="flex gap-9">
              <li>
                <a href="" className="font-bold text-base text-dark-blue">
                  Como funciona
                </a>
              </li>
              <li>
                <a href="" className="font-bold text-base text-dark-blue">
                  Nossos Pets
                </a>
              </li>
              <li>
                <a href="" className="font-bold text-base text-dark-blue">
                  Depoimentos
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <button className="flex items-center bg-orange-400 px-6 py-3 gap-3 rounded-full text-white font-bold">
          Login{" "}
          <Image src={IconLogin} width={20} height={20} alt="Icon login" />
        </button>
      </div>
    </header>
  );
}
