import { ThemeProvider } from "@/components/ThemeProvider";
import { DefaultSeo } from "next-seo";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
                url: "https://p2p.paris/paris-p2p-thumbnail.svg",
                width: 800,
                height: 600,
                alt: "Paris P2P",
                type: "image/svg",
              },
            ],
          }}
          twitter={{
            handle: "@ParisP2P",
            site: "@ParisP2P",
            cardType: "summary_large_image",
          }}
        />

        {/* Favicons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div className="flex flex-col bg-black">
            <Main />
            <NextScript />
          </div>
        </ThemeProvider>
      </body>
    </Html>
  );
}
