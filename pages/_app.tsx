import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { PagesTopLoader } from "nextjs-toploader/pages";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://p2p.paris/en",
          siteName: "Paris P2P",
          title:
            "The Parisian community interested in all things P2P - Paris P2P",
          description:
            "The Parisian community interested in P2P, Security & Cryptography technologies",
          images: [
            {
              url: "https://p2p.paris/paris-p2p-thumbnail.jpg",
              width: 800,
              height: 600,
              alt: "Paris P2P",
              type: "image/jpeg",
            },
          ],
        }}
        twitter={{
          handle: "@ParisP2P",
          site: "@ParisP2P",
          cardType: "summary_large_image",
        }}
      />
      <SessionProvider session={pageProps.session}>
        <PagesTopLoader color="white" showSpinner={false} />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
