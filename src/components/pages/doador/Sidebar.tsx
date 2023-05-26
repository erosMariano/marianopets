import React, { useState } from "react";
import Logo from "../../../assets/images/logo.svg";
import IconLogin from "../../../assets/images/icon-login.svg";

import Image from "next/image";
import Link from "next/link";
import { api } from "../../../../lib/axios";
import { useRouter } from "next/router";
import OpenMenu from "../../../assets/images/icons/hamburger.svg";
import CloseIcon from "../../../assets/images/icons/close.svg";

interface SidebarProps {
  activeMenu: "home" | "animais-cadastrados" | "novo-animal" | "editar-animal";
}
function Sidebar({ activeMenu }: SidebarProps) {
  const route = useRouter();
  const [menuActive, setMenuActive] = useState(false);

  async function handleClickInButtonControllerCookies() {
    await api.put("/auth/login");
    await route.push("/login");
  }

  function handleButtonMenu() {
    setMenuActive((prevState) => !prevState);
  }

  return (
    <div className="flex-col flex-1 flex">
      <Link href="/doador" className="lg:hidden absolute top-5">
        <Image src={Logo} alt="Logo Mariano Pets" width={200} height={50} />
      </Link>

      <button
        className="block lg:hidden w-9 h-9 absolute right-6 top-5"
        onClick={handleButtonMenu}
      >
        <Image
          src={!menuActive ? OpenMenu : CloseIcon}
          width={36}
          height={36}
          alt="Icon abrir menu"
        />
      </button>
      <nav
        className={`bg-white z-40 flex flex-col w-72 lg:w-80 shadow-sm rounded-lg flex-1 px-4 py-6 transition-all absolute lg:relative top-0 lg:left-0 ${
          menuActive ? "left-0  h-screen" : "-left-full"
        }`}
      >
        <Image src={Logo} alt="Logo Mariano Pets" width={200} height={50} />
        <ul className="mt-5 flex flex-col gap-4 flex-1">
          <li>
            <Link
              href={"/doador"}
              className={`font-semibold text-dark-text w-full block px-4 py-2 rounded-lg transition-all hover:bg-orange-300 ${
                activeMenu === "home" && "bg-orange-200"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href={"/doador/animais-cadastrados"}
              className={`font-semibold text-dark-text w-full block px-4 py-2 rounded-lg transition-all hover:bg-orange-300 ${
                activeMenu === "animais-cadastrados" && "bg-orange-200"
              }`}
            >
              Animais cadastrados
            </Link>
          </li>

          <li>
            <Link
              href={"/doador/cadastrar-animal"}
              className={`font-semibold text-dark-text w-full block px-4 py-2 rounded-lg transition-all hover:bg-orange-300 ${
                activeMenu === "novo-animal" && "bg-orange-200"
              }`}
            >
              Cadastrar novo animal
            </Link>
          </li>
        </ul>
        <button
          onClick={() => handleClickInButtonControllerCookies()}
          className="mt-4 mx-auto max-w-sm lg:max-w-full bottom-5 left-0 w-full flex justify-center items-center bg-orange-400 hover:bg-orange-500 transition-all px-4 py-2 lg:px-6 lg:text-base text-sm lg:py-3 gap-3 rounded-full text-white font-bold"
        >
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
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
