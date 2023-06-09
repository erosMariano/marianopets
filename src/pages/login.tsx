import { myFont } from "@/components/pages/Home/Hero";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "../../lib/axios";
import { z } from "zod";

import ImageCat from "../assets/images/feche-o-gato-fofo-dentro-de-casa.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetServerSideProps } from "next";
import { IncomingMessage } from "http";
import { checkCookies } from "@/utils/cookieUtils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const loginSchema = z.object({
  email: z.string().email({ message: "Formato inválido de email" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});
type LoginSchema = z.infer<typeof loginSchema>;

function SignIn() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submitForm(user: LoginSchema) {
    try {
      await api.post("/auth/login", user);
      await router.push("/doador/");
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;

        if (errorMessage && error.response?.data.type === "user") {
          setError("email", { message: error.response?.data.message });
          return;
        } else if (errorMessage && error.response?.data.type === "password") {
          setError("password", { message: error.response?.data.message });
        }
      }
    }
  }

  return (
    <>
      <Head>
        <title>Mariano Pets - Login</title>
        <meta name="description" content="Login Mariano Pets" />

        {/* Meta tags Open Graph (OG) */}
        <meta property="og:title" content={`Mariano Pets - Login`} />
        <meta property="og:description" content="Login Mariano Pets" />
        <meta
          property="og:image"
          content="https://marianopets.vercel.app/assets/images/banner-search.jpg"
        />
        <meta
          property="og:url"
          content={`https://marianopets.vercel.app/login`}
        />
        <meta property="og:type" content="website" />
      </Head>

      <Header />
      <main className="max-w-[1312px] mx-auto px-4 mt-20 pb-20 w-full flex-grow">
        <div className="bg-white w-full rounded-2xl shadow-sm flex overflow-hidden">
          <div className="w-2/5 h-[456px]  lg:flex hidden">
            <Image
              src={ImageCat}
              width={512}
              height={456}
              style={{ objectFit: "cover" }}
              alt="Imagem de cachorro"
            />
          </div>

          <div className="w-full lg:w-[27rem] mx-auto px-4 py-10 lg:px-0 lg:py-20">
            <h1
              className={`${myFont.className} text-2xl font-bold text-center mb-8 text-dark-text`}
            >
              Acesse a Plataforma de Doação!{" "}
            </h1>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(submitForm)}
            >
              <input
                className={`w-full px-4 py-2 rounded-md border-gray-300 font-semibold outline-none transition-all border focus:border-yellow-500 text-gray-700 ${
                  errors.email && "border-red-500"
                }`}
                type="email"
                placeholder="E-mail"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-400 -mt-4 flex -mb-2 font-semibold">
                  {errors.email.message}
                </span>
              )}

              <input
                className={`w-full px-4 py-2 rounded-md border-gray-300 font-semibold outline-none transition-all border focus:border-yellow-500 text-gray-700 ${
                  errors.password && "border-red-500"
                }`}
                type="password"
                autoComplete="current-password"
                placeholder="Senha"
                {...register("password")}
              />

              {errors.password && (
                <span className="text-red-400 -mt-4 flex -mb-2 font-semibold">
                  {errors.password.message}
                </span>
              )}
              <button
                className="w-full px-4 py-2 transition-all bg-orange-400 font-semibold text-white rounded-md hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-orange-800"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Entrando" : "Entrar"}
              </button>
            </form>

            <span className="block mx-auto w-full text-center mt-5 font-semibold ">
              <span className="text-light-text mr-1">
                Ainda não possui cadastro?
              </span>
              <Link
                className="text-orange-400 transition-all hover:text-orange-500"
                href={"/cadastro"}
              >
                Clique aqui
              </Link>
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
export default SignIn;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req as IncomingMessage;
  const cookiesValidate = checkCookies(req);

  if (cookiesValidate) {
    return {
      redirect: {
        destination: "/doador/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      cookiesValidate,
    },
  };
};
