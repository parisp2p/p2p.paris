import { Page } from "@/components/Page";
import { HomeButtonsSection } from "@/components/sections/home/buttons";
import { HomeCoOrg } from "@/components/sections/home/co-org";
import { HomeDonate } from "@/components/sections/home/donate";
import { HomeEventsHighlights } from "@/components/sections/home/event-highlights";
import { HomeEventsSection } from "@/components/sections/home/events";
import { HomeInformation } from "@/components/sections/home/information";
import { HomePlan } from "@/components/sections/home/plan";
import { HomeSchedule } from "@/components/sections/home/schedule";
import { HomeSpeakers } from "@/components/sections/home/speakers";
import TextureSeparatorComponent from "@/components/ui/texture-separator";
import { ClientEvent } from "@/types/client";
import {
  generatePageTypeByLocale,
  Locale,
  PageContent,
} from "@/utils/pageTypes";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";

import { formatClientEvent, groupTalksByDay } from "@/utils/helpers";
const Separator = ({ className = "" }: { className?: string }) => (
  <div className={`border w-full border-[#282828] mt-10 ${className}`}></div>
);

export default function Event({
  event,
  content,
}: {
  content: PageContent;
  event: ClientEvent;
}) {
  const groupedTalks = groupTalksByDay(event.talks);
  return (
    <Page
      meta={() => (
        <Head>
          <title>{event.name}</title>
        </Head>
      )}
    >
      <HomeEventsSection content={content.home} />
      <TextureSeparatorComponent className="border-0 border-b-[1px] border-r-[1px]" />
      <HomeButtonsSection content={content.home} />
      <HomeEventsHighlights
        totalDays={groupedTalks.length}
        totalEvents={event.talks.length}
        totalSpeakers={event.speakers.length}
        totalLocation={1}
      />
      <HomeDonate content={content.home} />
      <HomeCoOrg content={content.home} sponsors={event.sponsors} />
      <HomeSchedule
        content={content.home}
        talks={event.talks}
        groupedTalks={groupedTalks}
      />
      <Separator />
      <HomeSpeakers content={content.home} speakers={event.speakers} />
      <Separator />
      <HomeInformation content={content.home} />
      <Separator className="mt-20" />
      <HomePlan content={content.home} />
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

  const event = await prisma.event.findUnique({
    where: {
      slug: slug,
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

  if (event && !event?.sponsors.length) {
    event.sponsors = await prisma.organization.findMany({
      take: 20,
    });
  }

  const page = generatePageTypeByLocale(locale);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: page,
      event: formatClientEvent(event, locale),
    },
  };
}
