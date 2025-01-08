import {
  generatePageTypeByLocale,
  Locale,
  PageContent,
} from "@/utils/pageTypes";
import Head from "next/head";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

import { ClientSpeaker, ClientTalk } from "@/types/client";
import Image from "next/image";
import Link from "next/link";

import TextureSeparatorComponent from "@/components/ui/texture-separator";
import { Page } from "@/components/Page";
import { Button } from "@/components/ui/button";
import { NotFound } from "@/components/ui/not-found";
import { Talk } from "@/components/Talk";

export default function Talks({
  content,
  speaker,
  talks,
}: {
  content: PageContent;
  speaker: ClientSpeaker;
  talks: ClientTalk[];
}) {
  if (!speaker) {
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
          href="/speakers"
          className="mt-10 mb-5 flex w-full gap-3 items-center"
        >
          <Button className="mx-auto mb-10">
            <h1 className="uppercase font-bold">{content.speaker.showAll}</h1>
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
          <title>{speaker.name}</title>
        </Head>
      )}
    >
      <Link
        href="/speakers"
        className="mt-10 mb-5 flex w-full gap-3 items-center"
      >
        <Image
          src="/icons/chevron-left-white.svg"
          alt="Go back icon"
          height={40}
          width={40}
        />
        <h1 className="uppercase font-bold">{content.speaker.showAll}</h1>
      </Link>
      <div className="p-4 items-center flex flex-col">
        <Image src="/" height={160} width={160} className="bg-[#282828]" />
        <h1 className="text-lg font-semibold uppercase mt-4 mb-2">
          {speaker.name}
        </h1>
        <h2 className="text-lg uppercase mb-4">{speaker.desc}</h2>
        <div className="flex items-center justify-center gap-3">
          {!!speaker.social.twitter && (
            <a
              href={speaker.social?.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <Image
                src="/icons/twitter.svg"
                alt="Twitter logo"
                width={24}
                height={24}
              />
            </a>
          )}
          {!!speaker.social?.discord && (
            <a
              href={speaker.social.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <Image
                src="/icons/discord.svg"
                alt="Discord logo"
                width={24}
                height={24}
              />
            </a>
          )}
        </div>
      </div>
      <TextureSeparatorComponent className="border-0 border-b-[1px] border-r-[1px]" />

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

export async function getServerSideProps({
  locale,
  params: { slug },
}: {
  locale: Locale;
  params: { slug: string };
}) {
  const prisma = new PrismaClient();
  const speaker = await prisma.speaker.findUnique({
    where: {
      slug,
    },
    include: {
      talks: true,
    },
  });

  // TODO:
  // include talks from above, currently empty
  const talks = await prisma.talk.findMany({
    include: {
      event: {
        include: {
          location: true,
        },
      },
      speakers: true,
    },
    take: 10,
  });
  const page = generatePageTypeByLocale(locale);

  return {
    props: {
      content: page,
      speaker: speaker && {
        slug: speaker.slug,
        name: speaker.name,
        desc: speaker[`headline_${locale}`],
        social: {
          website: speaker.website_url,
          twitter: speaker.twitter_url,
          email: speaker.email,
          github: speaker.github_url,
          linkedIn: speaker.linkedin_url,
        },
      },
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
  };
}
