import { Page } from "@/components/Page";
import { HomeButtonsSection } from "@/components/sections/home/buttons";
import { HomeCoOrg } from "@/components/sections/home/co-org";
import { HomeEventsSection } from "@/components/sections/home/events";
import { HomeSpeakers } from "@/components/sections/home/speakers";
import { ClientEvent, ClientTalk } from "@/types/client";
import { CommonTypes, HomePage, Locale } from "@/utils/pageTypes";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";

import { HomeGathering } from "@/components/sections/home/gathering";
import { PreviousConferences } from "@/components/sections/home/previous-conferences";
import { formatClientEvent, formatClientTalk } from "@/utils/helpers";
const Separator = ({ className = "" }: { className?: string }) => (
  <div className={`border w-full border-[#282828] mt-10 ${className}`}></div>
);

export default function Home({
  activeEvent,
  content,
  commonContent,
  previousTalks,
}: {
  content: HomePage;
  commonContent: CommonTypes;
  activeEvent: ClientEvent;
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
      event={activeEvent}
    >
      <HomeEventsSection content={content} event={activeEvent} />
      <HomeGathering
        content={content}
        eventLink={`/events/${activeEvent.slug}`}
      />
      <PreviousConferences content={content} talks={previousTalks} />
      <HomeButtonsSection content={content} />
      <HomeCoOrg content={content} sponsors={activeEvent.sponsors} />
      <Separator />
      <HomeSpeakers
        content={content}
        speakers={activeEvent.speakers}
        commonContent={commonContent}
        isHomePage
      />
      <Separator />
    </Page>
  );
}

export async function getStaticProps({ locale }: { locale: Locale }) {
  const prisma = new PrismaClient();

  const activeEvent = await prisma.event.findFirst({
    where: {
      active: true,
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

  if (!activeEvent) {
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

  if (activeEvent && !activeEvent?.sponsors.length) {
    activeEvent.sponsors = await prisma.organization.findMany({
      take: 20,
    });
  }

  const page = await prisma.page.findUnique({
    where: {
      slug: "home",
    },
  });
  const commonPage = await prisma.page.findUnique({
    where: {
      slug: "common",
    },
  });

  await prisma.$disconnect();

  if (!page || !commonPage) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: JSON.parse(locale === "en" ? page.content_en : page.content_fr),
      commonContent: JSON.parse(
        locale === "fr" ? commonPage.content_fr : commonPage.content_en,
      ),
      activeEvent: formatClientEvent(activeEvent, locale),
      previousTalks: previousTalks.map((item) =>
        formatClientTalk(item, locale),
      ),
    },
  };
}
