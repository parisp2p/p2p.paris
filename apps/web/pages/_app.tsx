import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PagesTopLoader } from "nextjs-toploader/pages";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PagesTopLoader color="white" showSpinner={false} />
      <Component {...pageProps} />
    </>
  );
}
