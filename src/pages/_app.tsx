import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress color="linear-gradient(90deg, #F5B24E 0%, #F0A024 100%)" />
      <Component {...pageProps} />
    </>
  );
}
