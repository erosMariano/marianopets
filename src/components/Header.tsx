import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo.svg";
import IconLogin from "../assets/images/icon-login.svg";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import MenuHamburger from "../assets/images/icons/hamburger.svg";
import CloseIcon from "../assets/images/icons/close.svg";
import Link from "next/link";

export function Header() {
  const [activeHeader, setActiveHeader] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);

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

  function handleMenuClick(){
    setActiveMenu((prevState) => !prevState)
  }
  return (
    <header
      className={`flex items-center transition-all ${inter.className} ${
        activeHeader ? "bg-white shadow-sm" : "transparent"
      } sticky top-0 py-4 z-10`}
    >
      <div className="flex items-center justify-between w-full max-w-[1312px] mx-auto px-4">
        <div className="flex items-center gap-10 ">
          <Link href={"/"}>
            <Image
              src={Logo}
              alt="Logo Mariano Pets"
              className="w-[200px] lg:w-[303px]"
            />
          </Link>

          <nav
            className={`${
              activeMenu ? "left-0" : "left-full"
            } bg-[#fffaf5] transition-all flex items-center justify-center fixed h-screen top-0 w-full lg:block lg:relative lg:bg-transparent lg:h-auto lg:left-0`}
          >
            <button
              className="w-10 h-10 absolute top-5 right-5 lg:hidden"
              onClick={() => handleMenuClick}
            >
              <Image src={CloseIcon} width={40} height={40} alt="Icon close" />
            </button>

            <ul className="flex gap-9 flex-col items-center justify-center w-full px-4 lg:flex-row">
              <li>
                <Link
                  href=""
                  className="font-bold text-base text-dark-blue"
                  onClick={() => handleMenuClick}
                >
                  Como funciona
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="font-bold text-base text-dark-blue"
                  onClick={() => handleMenuClick}
                >
                  Nossos Pets
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="font-bold text-base text-dark-blue"
                  onClick={() => handleMenuClick}
                >
                  Depoimentos
                </Link>
              </li>

              <Link
                onClick={() => handleMenuClick}
                href="/login"
                className="flex items-center bg-orange-400 px-4 py-2 lg:px-6 lg:text-base text-sm lg:py-3 gap-3 rounded-full text-white font-bold max-w-xs w-full justify-center lg:hidden"
              >
                Quero doar{" "}
                <Image
                  src={IconLogin}
                  width={20}
                  height={20}
                  alt="Icon login"
                />
              </Link>
            </ul>
          </nav>
        </div>

        <Link
          href="/login"
          className="hidden lg:flex items-center bg-orange-400 px-4 py-2 lg:px-6 lg:text-base text-sm lg:py-3 gap-3 rounded-full text-white font-bold"
        >
          Quero doar
          <Image src={IconLogin} width={20} height={20} alt="Icon login" />
        </Link>

        <button
          className="w-10 h-10 lg:hidden"
          onClick={() => handleMenuClick}
        >
          <Image src={MenuHamburger} width={40} height={40} alt="Icon Menu" />
        </button>
      </div>
    </header>
  );
}
