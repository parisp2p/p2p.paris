import { ThemeProvider } from '@/components/ThemeProvider';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
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
