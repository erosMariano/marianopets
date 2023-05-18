import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export async function authValidate(context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) {
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
}
