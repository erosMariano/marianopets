import { GetServerSideProps } from "next";
import { Router } from "next/router";
import React from "react";

function FormDoacao(props: any) {
  console.log(props);
  return <div>People</div>;
}

export default FormDoacao;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie;


  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/authorization`, {
    headers: {
      Cookie: cookies!,
    },
  });

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
