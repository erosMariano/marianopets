import { GetServerSideProps } from "next";
import { Router } from "next/router";
import React from "react";

function People(props: any) {
  console.log(props);
  return <div>People</div>;
}

export default People;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie;

  const res = await fetch("http://localhost:3000/api/auth/people", {
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
