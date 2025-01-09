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
import Link from "next/link";

import TextureSeparatorComponent from "@/components/ui/texture-separator";
import { HomeSpeakers } from "@/components/sections/home/speakers";
import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { NotFound } from "@/components/ui/not-found";
import { formatClientTalk } from "@/utils/helpers";

export default function Talks({
  content,
  talk,
}: {
  content: PageContent;
  talk: ClientTalk;
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
      <Talk {...talk} speakers={talk.speakers} isSingleView />
      <TextureSeparatorComponent className="border-0 border-b-[1px] border-r-[1px]" />
      {!!talk?.speakers?.length && (
        <HomeSpeakers content={content.home} speakers={talk.speakers} />
      )}
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

  return {
    props: {
      content: page,
      talk: talk && formatClientTalk(talk, locale),
    },
  };
}
