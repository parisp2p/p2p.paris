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
import { Page } from "@/components/Page";

export default function Talks({
  content,
  talks,
}: {
  content: PageContent;
  talks: ClientTalk[];
}) {
  return (
    <Page
      meta={() => (
        <Head>
          <title>{content.talk.title}</title>
        </Head>
      )}
    >
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
        {talks.map((talk) => (
          <Talk key={talk.slug} {...talk} />
        ))}
      </div>
    </Page>
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
        type: t.type,
      })),
    },
    revalidate: 60,
  };
}
