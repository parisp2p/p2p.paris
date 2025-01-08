import {
  generatePageTypeByLocale,
  Locale,
  PageContent,
} from "@/utils/pageTypes";
import Head from "next/head";
import { PrismaClient } from "@prisma/client";
import { Talk } from "@/components/Talk";

import { ClientSpeaker, ClientTalk } from "@/types/client";
import Image from "next/image";
import Link from "next/link";

import TextureSeparatorComponent from "@/components/ui/texture-separator";
import { HomeSpeakers } from "@/components/sections/home/speakers";
import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { NotFound } from "@/components/ui/not-found";
import { formatClientSpeaker, formatClientTalk } from "@/utils/helpers";

export default function Talks({
  content,
  talk,
  speakers,
}: {
  content: PageContent;
  talk: ClientTalk;
  speakers: ClientSpeaker[];
}) {
  if (!talk) {
    return (
      <Page
        meta={() => (
          <Head>
            <title>{content.common.notFound}</title>
          </Head>
        )}
      >
        <NotFound />
        <Link
          href="/talks"
          className="mt-10 mb-5 flex w-full gap-3 items-center"
        >
          <Button className="mx-auto mb-10">
            <h1 className="uppercase font-bold">{content.talk.showAll}</h1>
          </Button>
        </Link>
        <TextureSeparatorComponent className="border-0 border-b-[1px] border-r-[1px]" />
      </Page>
    );
  }
  return (
    <Page
      meta={() => (
        <Head>
          <title>{talk.title}</title>
        </Head>
      )}
    >
      <Link href="/talks" className="mt-10 mb-5 flex w-full gap-3 items-center">
        <Image
          src="/icons/chevron-left-white.svg"
          alt="Go back icon"
          height={40}
          width={40}
        />
        <h1 className="uppercase font-bold">{content.talk.showAll}</h1>
      </Link>
      <Talk
        {...talk}
        speakers={talk.speakers.map((item) => item.name)}
        isSingleView
      />
      <TextureSeparatorComponent className="border-0 border-b-[1px] border-r-[1px]" />
      <HomeSpeakers content={content.home} speakers={speakers} />
    </Page>
  );
}

export async function getServerSideProps({
  locale,
  params: { slug },
}: {
  locale: Locale;
  params: { slug: string };
}) {
  const prisma = new PrismaClient();
  const talk = await prisma.talk.findUnique({
    where: {
      slug,
    },
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

  // TODO:
  // include speakers from above, currently empty
  const speakers = await prisma.speaker.findMany({
    include: {
      talks: true,
    },
    take: 10,
  });
  return {
    props: {
      content: page,
      talk: talk && formatClientTalk(talk, locale),
      speakers: speakers.map((t) => formatClientSpeaker(t, locale)),
    },
  };
}
