import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import dayjs from "dayjs";
import {
  generatePageTypeByLocale,
  Locale,
  PageContent,
} from "@/utils/pageTypes";
import Head from "next/head";
import { PrismaClient } from "@prisma/client";
import { Talk } from "@/components/Talk";

import { ClientTalk } from "@/types/client";
import Image from "next/image";

export default function Talks({
  content,
  talks,
}: {
  content: PageContent;
  talks: ClientTalk[];
}) {
  return (
    <>
      <Head>
        <title>{content.talk.title}</title>
      </Head>
      <div className="flex flex-col items-center w-full min-h-screen">
        <div className="max-w-[1344px] w-full flex flex-col items-center px-8">
          <Header />
          <div className=" mt-10 mb-5 flex w-full gap-3">
            <Image
              src="/icons/talk-white.svg"
              alt="Talk icon"
              height={24}
              width={24}
            />
            <h1 className="uppercase font-bold">{content.talk.title}</h1>
          </div>
          <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-4">
            {talks.map((talk, index) => (
              <Talk key={index} {...talk} />
            ))}
          </div>
          <Footer content={content.home} />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: Locale }) {
  const prisma = new PrismaClient();
  const talks = await prisma.talk.findMany({
    include: {
      event: {
        include: {
          location: true,
        },
      },
      speakers: true,
    },
  });
  const page = generatePageTypeByLocale(locale);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: page,
      talks: talks.map((t) => ({
        slug: t.slug,
        startDateTime: dayjs(t.start_date).format("YYYY-MM-DDTHH:mm:ssZ"),
        endDateTime: dayjs(t.end_date).format("YYYY-MM-DDTHH:mm:ssZ"),
        language: "EN",
        location: t.event.location[`name_${locale}`],
        speakers: t.speakers.map((speaker) => speaker.name),
        imageURL: "",
        title: t[`title_${locale}`],
        description: t[`description_${locale}`],
      })),
    },
    revalidate: 60,
  };
}
