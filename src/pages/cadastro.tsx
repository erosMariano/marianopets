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
import Image from "next/image";

import ImageDogs from "../assets/images/beagles-filhotes-bocejando.jpg";
import { myFont } from "@/components/pages/Home/Hero";
import { Header } from "@/components/Header";

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

      <Header />
      <main className="max-w-[1312px] mx-auto px-4 mt-20 pb-20">
        <div className="bg-white w-full rounded-2xl shadow-sm flex lg:flex-row overflow-hidden">
          <div className="w-2/5 h-[640px] lg:flex hidden">
            <Image
              src={ImageDogs}
              quality={100}
              width={512}
              height={640}
              priority={true}
              alt="Imagem de cachorro"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="w-full  lg:w-[27rem] mx-auto px-4 py-10 lg:px-0 lg:py-20">
            <h1
              className={`${myFont.className} text-2xl font-bold text-center mb-8 text-dark-text`}
            >
              Seja parte da nossa Comunidade Pet!
            </h1>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className={`w-full px-4 py-2 rounded-md border-gray-300 font-semibold outline-none transition-all border focus:border-yellow-500 text-gray-700 ${
                  errors.name && "border-red-500"
                }`}
                type="text"
                placeholder="Nome completo"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-400 -mt-4 flex -mb-2 font-semibold">
                  {errors.name.message}
                </span>
              )}

              <input
                className={`w-full px-4 py-2 rounded-md border-gray-300 font-semibold outline-none transition-all border focus:border-yellow-500 text-gray-700 ${
                  errors.email && "border-red-500"
                }`}
                type="email"
                placeholder="E-mail"
                autoComplete="email"
                {...register("email", { required: true })}
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
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-400 -mt-4 flex -mb-2 font-semibold">
                  {errors.password.message}
                </span>
              )}

              <InputMask
                placeholder="Número de telefone"
                className={`w-full px-4 py-2 rounded-md border-gray-300 font-semibold outline-none transition-all border focus:border-yellow-500 text-gray-700 ${
                  errors.phone && "border-red-500"
                }`}
                mask="(99)9 9999 9999"
                defaultValue={""}
                alwaysShowMask={true}
                {...register("phone", { required: true })}
              />

              {errors.phone && (
                <span className="text-red-400 -mt-4 flex -mb-2 font-semibold">
                  {errors.phone.message}
                </span>
              )}

              <button
                className="w-full px-4 py-2 transition-all bg-orange-400 font-semibold text-white rounded-md hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-blue-950"
                type="submit"
                disabled={isSubmitting}
              >
                Cadastrar
              </button>
            </form>

            <span className="block mx-auto w-full text-center mt-5 font-semibold ">
              <span className="text-light-text mr-1">Já possui cadastro?</span>
              <Link
                className="text-orange-400 transition-all hover:text-orange-500"
                href={"/login"}
              >
                Clique aqui
              </Link>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}

export default SignUp;
