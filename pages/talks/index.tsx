import { Talk } from "@/components/Talk";
import { Locale, TalkPage } from "@/utils/pageTypes";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";

import { Page } from "@/components/Page";
import { ClientTalk } from "@/types/client";
import { formatClientTalk } from "@/utils/helpers";
import Image from "next/image";

export default function Talks({
  content,
  talks,
}: {
  content: TalkPage;
  talks: ClientTalk[];
}) {
  return (
    <Page
      meta={() => (
        <Head>
          <title>{content.title}</title>
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
        <h1 className="uppercase font-bold">{content.title}</h1>
      </div>
      <div className="mb-20 grid grid-cols-1 xl:grid-cols-2 gap-4">
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
  const page = await prisma.page.findUnique({
    where: {
      slug: "talk",
    },
  });

  await prisma.$disconnect();

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: JSON.parse(locale === "fr" ? page.content_fr : page.content_en),
      talks: talks.map((t) => formatClientTalk(t, locale)),
    },
  };
}
