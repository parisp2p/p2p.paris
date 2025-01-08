import dayjs from "dayjs";
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
      talk: talk && {
        slug: talk.slug,
        startDateTime: dayjs(talk.start_date).format("YYYY-MM-DDTHH:mm:ssZ"),
        endDateTime: dayjs(talk.end_date).format("YYYY-MM-DDTHH:mm:ssZ"),
        language: "EN",
        location: talk.event.location[`name_${locale}`],
        speakers: talk.speakers,
        imageURL: "",
        title: talk[`title_${locale}`],
        description: talk[`description_${locale}`],
        type: talk.type,
      },
      speakers: speakers.map(
        (t): ClientSpeaker => ({
          slug: t.slug,
          name: t.name,
          desc: t[`headline_${locale}`],
          social: {
            website: t.website_url,
            twitter: t.twitter_url,
            email: t.email,
            github: t.github_url,
            linkedIn: t.linkedin_url,
          },
        }),
      ),
    },
  };
}
