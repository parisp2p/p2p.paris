import React from "react";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";

interface PageProps extends React.PropsWithChildren {
  meta?: React.ElementType;
}

export const Page = ({ meta: Meta, children }: PageProps) => {
  return (
    <>
      {!!Meta && <Meta />}
      <div className="flex flex-col items-center w-full min-h-screen">
        <div className="max-w-[1344px] w-full flex flex-col items-center px-8">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
};
