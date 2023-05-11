import React, { useState } from "react";
import { api } from "../../lib/axios";
import axios, { AxiosError } from "axios";

interface UserCadastro {
  name: string;
  email: string;
  password: string;
  phone: string;
}
function SignUp() {
  const [userData, setUserData] = useState<UserCadastro>({
    email: "",
    name: "",
    password: "",
    phone: "",
  });

  async function submitForm(event: React.FormEvent) {
    event.preventDefault();

    // Validação userData
    try {
      const sendRegisterUser = await api.post("/auth/register", userData);
      alert(sendRegisterUser.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  }
  return (
    <>
      <h1 className="text-2xl font-bold text-center my-5">Cadastro</h1>
      <form
        className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg"
        onSubmit={(e) => submitForm(e)}
      >
        <input
          className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="text"
          placeholder="Nome completo"
          name="name"
          onChange={(el) => setUserData({ ...userData, name: el.target.value })}
        />
        <br />
        <input
          className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={(el) =>
            setUserData({ ...userData, email: el.target.value })
          }
        />
        <br />
        <input
          className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="password"
          placeholder="Senha"
          name=""
          onChange={(el) =>
            setUserData({ ...userData, password: el.target.value })
          }
        />
        <br />
        <input
          className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="number"
          placeholder="Número de telefone"
          name="phone"
          onChange={(el) =>
            setUserData({ ...userData, phone: el.target.value })
          }
        />
        <br />
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </>
  );
}

export default SignUp;
