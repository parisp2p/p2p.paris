import Header from "@/components/Header";
import { HomeButtonsSection } from "@/components/sections/home/buttons";
import { HomeCoOrg } from "@/components/sections/home/co-org";
import { HomeDonate } from "@/components/sections/home/donate";
import { HomeEventsHighlights } from "@/components/sections/home/event-highlights";
import { HomeEventsSection } from "@/components/sections/home/events";
import { HomeInformation } from "@/components/sections/home/information";
import { HomeSchedule } from "@/components/sections/home/schedule";
import { HomeSpeakers } from "@/components/sections/home/speakers";
import TextureSeparatorComponent from "@/components/ui/texture-separator";
import { defaultPagesContent, HomePage } from "@/utils/pageTypes";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";

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
          <HomeEventsHighlights content={content} />
          <HomeDonate content={content} />
          <HomeCoOrg content={content} />
          <HomeSchedule content={content} />
          <Separator />
          <HomeSpeakers content={content} />
          <Separator />
          <HomeInformation content={content} />
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
