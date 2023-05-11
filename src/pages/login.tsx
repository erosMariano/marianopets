import React, { useState } from "react";
import { api } from "../../lib/axios";
import axios, { AxiosError } from "axios";

interface LoginUser {
  email: string;
  password: string;
}
function SignIn() {
  const [userData, setUserData] = useState<LoginUser>({
    email: "",
    password: "",
  });

  async function submitForm(event: React.FormEvent) {
    event.preventDefault();
    try {
      const sendRegisterUser = await api.post("/auth/login", userData);
      alert(sendRegisterUser.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  }
  return (
    <>
      <h1 className="text-2xl font-bold text-center my-5">Login</h1>
      <form
        className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg"
        onSubmit={(e) => submitForm(e)}
      >
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
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default SignIn;
