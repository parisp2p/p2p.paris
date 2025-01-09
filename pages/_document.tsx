import { ThemeProvider } from "@/components/ThemeProvider";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="The Parisian community interested in P2P, Security & Cryptography technologies"
        />
        <meta
          property="og:title"
          content="The Parisian community interested in all things P2P - Paris P2P"
        />
        <meta
          property="og:description"
          content="The Parisian community interested in P2P, Security & Cryptography technologies"
        />
        <meta property="og:image" content="/images/paris_p2p_thumbnail.jpg" />
        <meta property="og:url" content="https://p2p.paris/en" />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content="The Parisian community interested in all things P2P - Paris P2P"
        />
        <meta
          name="twitter:description"
          content="The Parisian community interested in P2P, Security & Cryptography technologies"
        />
        <meta name="twitter:image" content="/images/paris_p2p_thumbnail.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
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
