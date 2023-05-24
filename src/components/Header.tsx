import { Inter } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import IconLogin from "../assets/images/icon-login.svg";
import Logo from "../assets/images/logo.svg";
const inter = Inter({ subsets: ["latin"] });

import Link from "next/link";
import { api } from "../../lib/axios";
import CloseIcon from "../assets/images/icons/close.svg";
import MenuHamburger from "../assets/images/icons/hamburger.svg";
import { useRouter } from "next/router";

interface PropsTeste {
  authenticated?: boolean;
}
export function Header({ authenticated }: PropsTeste) {
  const [activeHeader, setActiveHeader] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const route = useRouter();

  useEffect(() => {
    function stickyMenu() {
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
    window.addEventListener("scroll", stickyMenu);
  }, [activeHeader]);

  function handleMenuClick() {
    setActiveMenu((prevState) => !prevState);
  }

  async function handleClickInButtonControllerCookies() {
    if (authenticated) {
      await api.put("/auth/login");
      await route.push("/login");
    } else {
      await route.push("/login");
    }
  }
  return (
    <header
      className={`flex items-center transition-all ${inter.className} ${
        activeHeader ? "bg-white shadow-sm" : "transparent"
      } sticky top-0 py-4 z-10`}
    >
      <div className="flex items-center justify-between w-full max-w-[1312px] mx-auto px-4">
        <div className="flex items-center xl:gap-10 ">
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
              onClick={() => handleMenuClick()}
            >
              <Image src={CloseIcon} width={40} height={40} alt="Icon close" />
            </button>

            <ul className="flex gap-9 flex-col items-center justify-center w-full px-4 lg:flex-row">
              <li className="flex flex-col relative group">
                <Link
                  href="/#como-funciona"
                  className="font-bold text-base text-dark-blue relative after:w-full after:"
                  onClick={() => handleMenuClick()}
                >
                  Como funciona
                </Link>
                <span className="absolute bg-orange-400 w-0 h-[1px] bottom-0 group-hover:w-full transition-all"></span>
              </li>

              <li className="flex flex-col relative group">
                <Link
                  href="/#adote-pet"
                  className="font-bold text-base text-dark-blue"
                  onClick={() => handleMenuClick()}
                >
                  Adote um pet
                </Link>
                <span className="absolute bg-orange-400 w-0 h-[1px] bottom-0 group-hover:w-full transition-all"></span>
              </li>

              <li className="flex flex-col relative group">
                <Link
                  href="/#depoimentos"
                  className="font-bold text-base text-dark-blue"
                  onClick={() => handleMenuClick()}
                >
                  Depoimentos
                </Link>
                <span className="absolute bg-orange-400 w-0 h-[1px] bottom-0 group-hover:w-full transition-all"></span>
              </li>

              <li className="flex flex-col relative group">
                <Link
                  href="/quero-adotar"
                  className="font-bold text-base text-dark-blue"
                  onClick={() => handleMenuClick()}
                >
                  Nossos Pets
                </Link>
                <span className="absolute bg-orange-400 w-0 h-[1px] bottom-0 group-hover:w-full transition-all"></span>
              </li>

              <button
                onClick={() => handleClickInButtonControllerCookies()}
                className="flex items-center bg-orange-400 px-4 py-2 transition-all lg:px-6 lg:text-base text-sm hover:bg-orange-500 lg:py-3 gap-3 rounded-full text-white font-bold max-w-xs w-full justify-center lg:hidden"
              >
                <>
                  {authenticated ? (
                    <>
                      Sair
                      <Image
                        src={IconLogin}
                        width={20}
                        height={20}
                        alt="Icon login"
                      />
                    </>
                  ) : (
                    <>
                      Quero doar
                      <Image
                        src={IconLogin}
                        width={20}
                        height={20}
                        alt="Icon login"
                      />
                    </>
                  )}
                </>
              </button>
            </ul>
          </nav>
        </div>

        <button
          onClick={() => handleClickInButtonControllerCookies()}
          className="hidden lg:flex items-center bg-orange-400 hover:bg-orange-500 transition-all px-4 py-2 lg:px-6 lg:text-base text-sm lg:py-3 gap-3 rounded-full text-white font-bold"
        >
          <>
            {authenticated ? (
              <>
                <Image
                  src={IconLogin}
                  width={20}
                  height={20}
                  className="rotate-180"
                  alt="Icon login"
                />
                Sair
              </>
            ) : (
              <>
                <span className="w-[95px]">Quero doar</span>
                <Image
                  src={IconLogin}
                  width={20}
                  height={20}
                  alt="Icon login"
                />
              </>
            )}
          </>
        </button>

        <button
          className="w-10 h-10 lg:hidden"
          onClick={() => handleMenuClick()}
        >
          <Image src={MenuHamburger} width={40} height={40} alt="Icon Menu" />
        </button>
      </div>
    </header>
  );
}
