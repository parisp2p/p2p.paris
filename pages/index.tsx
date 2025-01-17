import { Page } from "@/components/Page";
import { HomeButtonsSection } from "@/components/sections/home/buttons";
import { HomeCoOrg } from "@/components/sections/home/co-org";
import { HomeEventsSection } from "@/components/sections/home/events";
import { HomeSpeakers } from "@/components/sections/home/speakers";
import { ClientEvent, ClientTalk } from "@/types/client";
import { HomePage, Locale } from "@/utils/pageTypes";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";

import { HomeGathering } from "@/components/sections/home/gathering";
import { PreviousConferences } from "@/components/sections/home/previous-conferences";
import { formatClientEvent, formatClientTalk } from "@/utils/helpers";
const Separator = ({ className = "" }: { className?: string }) => (
  <div className={`border w-full border-[#282828] mt-10 ${className}`}></div>
);

export default function Home({
  event,
  content,
  previousTalks,
}: {
  content: HomePage;
  event: ClientEvent;
  previousTalks: ClientTalk[];
}) {
  return (
    <Page
      meta={() => (
        <Head>
          <title>
            The Parisian community interested in all things P2P - Paris P2P
          </title>
        </Head>
      )}
    >
      <HomeEventsSection content={content} event={event} />
      <HomeGathering content={content} eventLink={`/events/${event.slug}`} />
      <PreviousConferences content={content} talks={previousTalks} />
      <HomeButtonsSection content={content} />
      <HomeCoOrg content={content} sponsors={event.sponsors} />
      <Separator />
      <HomeSpeakers content={content} speakers={event.speakers} />
      <Separator />
    </Page>
  );
}

export async function getStaticProps({ locale }: { locale: Locale }) {
  const prisma = new PrismaClient();

  const ACTIVE_EVENT_SLUG = "festival-1";

  const event = await prisma.event.findUnique({
    where: {
      slug: ACTIVE_EVENT_SLUG,
    },
    include: {
      talks: {
        include: {
          speakers: true,
        },
      },
      sponsors: true,
      location: true,
    },
  });

  if (!event) {
    return {
      notFound: true,
    };
  }

  const previousTalks = await prisma.talk.findMany({
    take: 3,
    orderBy: {
      start_date: "desc",
    },
    include: {
      event: true,
    },
  });

  if (event && !event?.sponsors.length) {
    event.sponsors = await prisma.organization.findMany({
      take: 20,
    });
  }

  const page = await prisma.page.findUnique({
    where: {
      slug: "home",
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
      content: JSON.parse(locale === "en" ? page.content_en : page.content_fr),
      event: formatClientEvent(event, locale),
      previousTalks: previousTalks.map((item) =>
        formatClientTalk(item, locale),
      ),
    },
  };
}
