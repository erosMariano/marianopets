import { Header } from "@/components/Header";
import { GetServerSideProps } from "next";
import React from "react";

interface PropsFormDoacao {
  people: {
    email: string;
    name: string;
    phone: string;
  };
}
function FormDoacao({ people }: PropsFormDoacao) {
  return (
    <>
      <Header authenticated/>
      <div className="font-bold text-center mt-20">Olá, {people.name}</div>
    </>
  );
}
export default FormDoacao;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/authorization`,
    {
      headers: {
        Cookie: cookies!,
      },
    }
  );

  const people = await res.json();

  if (res.status === 500 || !context.req) {
    return {
      redirect: {
        destination: "/login", //
        permanent: false,
      },
    };
  }

  return {
    props: {
      people,
    },
  };
};
