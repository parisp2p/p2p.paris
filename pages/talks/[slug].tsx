import { Talk } from "@/components/Talk";
import { CommonTypes, HomePage, Locale, TalkPage } from "@/utils/pageTypes";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";

import { ClientTalk } from "@/types/client";
import Image from "next/image";
import Link from "next/link";

import { Page } from "@/components/Page";
import { HomeSpeakers } from "@/components/sections/home/speakers";
import { Button } from "@/components/ui/button";
import { NotFound } from "@/components/ui/not-found";
import TextureSeparatorComponent from "@/components/ui/texture-separator";
import { formatClientTalk } from "@/utils/helpers";

export default function Talks({
  content,
  talk,
}: {
  content: { common: CommonTypes; talk: TalkPage; home: HomePage };
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
export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const talks = await prisma.talk.findMany({
    select: {
      slug: true,
    },
  });
  await prisma.$disconnect();

  const paths = talks.map((talk) => ({
    params: { slug: talk.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({
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

  const homePage = await prisma.page.findUnique({
    where: {
      slug: "home",
    },
  });

  const talkPage = await prisma.page.findUnique({
    where: {
      slug: "talk",
    },
  });

  const commonPage = await prisma.page.findUnique({
    where: {
      slug: "common",
    },
  });

  await prisma.$disconnect();

  if (!talk || !homePage || !talkPage || !commonPage) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: {
        common: locale === "en" ? commonPage.content_en : commonPage.content_fr,
        home: locale === "en" ? homePage.content_en : homePage.content_fr,
        talk: locale === "en" ? talkPage.content_en : talkPage.content_fr,
      },
      talk: talk && formatClientTalk(talk, locale),
    },
  };
}
