import React from "react";
import Logo from "../../../assets/images/logo.svg";
import IconLogin from "../../../assets/images/icon-login.svg";

import Image from "next/image";
import Link from "next/link";
import { api } from "../../../../lib/axios";
import { useRouter } from "next/router";

interface SidebarProps {
  activeMenu: "home" | "animais-cadastrados" | "novo-animal" | 'editar-animal';
}
function Sidebar({ activeMenu }: SidebarProps) {
  const route = useRouter();

  async function handleClickInButtonControllerCookies() {
    await api.put("/auth/login");
    await route.push("/login");
  }
  
  return (
    <div className="flex flex-col flex-1">
      <nav className="bg-white flex flex-col w-80 shadow-sm rounded-lg flex-1 px-4 py-6 relative">
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
          className="hidden bottom-5 left-0 w-full lg:flex justify-center items-center bg-orange-400 hover:bg-orange-500 transition-all px-4 py-2 lg:px-6 lg:text-base text-sm lg:py-3 gap-3 rounded-full text-white font-bold"
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
