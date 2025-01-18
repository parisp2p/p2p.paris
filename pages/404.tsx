import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { NextSeo } from "next-seo";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <NextSeo
        title="Paris P2P"
        description="Discover hundreds of talks on P2P, Cryptography, Privacy and more."
        canonical="https://paris.p2p/"
      />
      <div className="flex flex-col w-3/4 mx-auto gap-16 justify-between">
        <Header />
      </div>

      <div className="flex flex-col gap-8 mx-auto text-center">
        <h2 className="uppercase text-xl">No cool peers to find here :(</h2>
        <p className="">You got lost</p>
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>

      <div></div>
      <div></div>
    </div>
  );
}
