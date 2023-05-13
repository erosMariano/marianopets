import axios from "axios";
import { api } from "../../lib/axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";

import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

//remove os caracteres que não são números
const phoneSchema = z
  .string()
  .transform((value) => value.replace(/[^\d]/g, ""));

const signUpSchema = z.object({
  name: z.string().min(5, { message: "Nome necessário" }),
  email: z.string().email({ message: "Formato inválido de email" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
  phone: phoneSchema.refine((value) => value.length === 11, {
    message: "Insira um número válido",
  }),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = phoneInputRef.current;
    if (input) {
      input.select();
    }
  }, []);

  const route = useRouter();

  async function onSubmit(data: SignUpSchema) {
    try {
      const sendRegisterUser = await api.post("/auth/register", data);

      toast.success(`${sendRegisterUser.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      route.push("/login");
      reset();
      reset({ phone: "" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }

  return (
    <>
      <Head>
        <title>Mariano Pets - Cadastro</title>
      </Head>
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center my-5">Cadastro</h1>
      <form
        className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="text"
          placeholder="Nome completo"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-red-500 -mt-2 flex mb-2">
            {errors.name.message}
          </span>
        )}

        <input
          className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="email"
          placeholder="E-mail"
          autoComplete="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500 -mt-2 flex mb-2">
            {errors.email.message}
          </span>
        )}

        <input
          className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          type="password"
          autoComplete="current-password"
          placeholder="Senha"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-500 -mt-2 flex mb-2">
            {errors.password.message}
          </span>
        )}

        <InputMask
          placeholder="Número de telefone"
          className="w-full mb-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          mask="(99)9 9999 9999"
          defaultValue={""}
          alwaysShowMask={true}
          {...register("phone", { required: true })}
        />

        {errors.phone && (
          <span className="text-red-500 -mt-2 flex mb-2">
            {errors.phone.message}
          </span>
        )}

        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-950"
          type="submit"
          disabled={isSubmitting}
        >
          Cadastrar
        </button>
      </form>

      <span className="block mx-auto w-full text-center">
        Já tem cadastro?{" "}
        <Link className="text-blue-600" href={"/login"}>
          Clique aqui
        </Link>
      </span>
    </>
  );
}

export default SignUp;
