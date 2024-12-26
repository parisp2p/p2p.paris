import Header from "@/components/Header";
import { HomeButtonsSection } from "@/components/sections/home/buttons";
import { HomeEventsSection } from "@/components/sections/home/events";
import TextureSeparatorComponent from "@/components/ui/texture-separator";
import { defaultPagesContent, HomePage } from "@/utils/pageTypes";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";

const Button = ({ text }: { text: string }) => (
  <button className="uppercase border border-white px-4 py-2 hover:cursor-pointer">
    {text}
  </button>
);

const Separator = () => (
  <div className="border w-full border-[#282828] mt-10"></div>
);

export default function Home({ content }: { content: HomePage }) {
  return (
    <>
      <Head>
        <title>
          The Parisian community interested in all things P2P - Paris P2P
        </title>
      </Head>
      <div className="flex flex-col items-center w-full min-h-screen">
        <div className="max-w-[1344px] w-full flex flex-col items-center px-8">
          <Header />
          <HomeEventsSection content={content} />
          <TextureSeparatorComponent className="border-0 border-b-[1px] border-r-[1px]" />
          <HomeButtonsSection content={content} />
          <Separator />

          <div className="flex flex-col gap-6 items-center mt-8 w-full">
            <h2 className="text-2xl uppercase">Our events_</h2>
            <div className="flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border border-[#282828]">
                <div className="min-h-48 border border-[#282828] flex flex-col justify-between p-6">
                  <h3 className="uppercase text-lg">5 Days</h3>
                  <p className="uppercase text-sm text-gray-500">
                    {content.hero.nextMainEvent.descriptionTitle}
                  </p>
                </div>
                <div className="min-h-48 border border-[#282828] flex flex-col justify-between p-6">
                  <h3 className="uppercase text-lg">5 Days</h3>
                  <p className="uppercase text-sm text-gray-500">
                    {content.hero.nextMainEvent.descriptionTitle}
                  </p>
                </div>
                <div className="min-h-48 border border-[#282828] flex flex-col justify-between p-6">
                  <h3 className="uppercase text-lg">5 Days</h3>
                  <p className="uppercase text-sm text-gray-500">
                    {content.hero.nextMainEvent.descriptionTitle}
                  </p>
                </div>
                <div className="min-h-48 border border-[#282828] flex flex-col justify-between p-6">
                  <h3 className="uppercase text-lg">5 Days</h3>
                  <p className="uppercase text-sm text-gray-500">
                    {content.hero.nextMainEvent.descriptionTitle}
                  </p>
                </div>
              </div>

              <div className="flex">
                <Image
                  width={10000}
                  height={80}
                  src="/images/texture-full.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col">
          <div className="mx-auto flex flex-col gap-6">
            <h2 className="text-2xl uppercase">Support us_</h2>

            <div className="flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-0 border border-[#282828]">
                <div className="border border-[#282828] min-h-48 flex flex-col justify-between p-6">
                  <h3 className="uppercase text-lg">5 Days</h3>
                  <div className="flex w-full justify-between">
                    <p className="uppercase text-sm text-gray-500">
                      {content.hero.nextMainEvent.descriptionTitle}
                    </p>
                    <Button text="Donate" />
                  </div>
                </div>
              </div>

              <div className="flex">
                <Image
                  width={10000}
                  height={80}
                  src="/images/texture-full.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer></footer>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const prisma = new PrismaClient();

  //const page = await prisma.page.findUnique({ where: { slug: 'home' } });

  const page = defaultPagesContent["home"];
  page.content_en = JSON.stringify(page.en);
  page.content_fr = JSON.stringify(page.fr);

  if (!page) {
    return {
      notFound: true,
    };
  }

  if (locale === "en") {
    return {
      props: {
        content: JSON.parse(page.content_en),
      },
      revalidate: 60, // optional
    };
  }

  if (locale === "fr") {
    return {
      props: {
        content: JSON.parse(page.content_fr),
      },
      revalidate: 60, // optional
    };
  }

  return {
    notFound: true,
  };
}
