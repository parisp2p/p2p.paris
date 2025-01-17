import { Page } from "@/components/Page";

import { HomeCoOrg } from "@/components/sections/home/co-org";
import { HomeDonate } from "@/components/sections/home/donate";
import { HomeEventsHighlights } from "@/components/sections/home/event-highlights";
import { HomeInformation } from "@/components/sections/home/information";
import { HomePlan } from "@/components/sections/home/plan";
import { HomeSchedule } from "@/components/sections/home/schedule";
import { HomeSpeakers } from "@/components/sections/home/speakers";
import TextureSeparatorComponent from "@/components/ui/texture-separator";
import { ClientEvent } from "@/types/client";
import { HomePage, Locale } from "@/utils/pageTypes";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";
import { Event as EventComponent } from "@/components/Event";

import { formatClientEvent } from "@/utils/helpers";
const Separator = ({ className = "" }: { className?: string }) => (
  <div className={`border w-full border-[#282828] mt-10 ${className}`}></div>
);

export default function Event({
  event,
  content,
}: {
  content: HomePage;
  event: ClientEvent;
}) {
  return (
    <Page
      meta={() => (
        <Head>
          <title>{event.name}</title>
        </Head>
      )}
    >
      <EventComponent content={content} event={event} />
      <TextureSeparatorComponent className="border-0 border-b-[1px] border-r-[1px]" />

      <HomeEventsHighlights
        totalEvents={event.talks.length}
        totalSpeakers={event.speakers.length}
        totalLocation={1}
        startDateTime={event.startDateTime}
        endDateTime={event.endDateTime}
        location={event.location}
      />
      <HomeDonate content={content} />
      <HomeCoOrg content={content} sponsors={event.sponsors} />
      <HomeSchedule content={content} talks={event.talks} />
      <Separator />
      <HomeSpeakers content={content} speakers={event.speakers} />
      <Separator />
      <HomeInformation content={content} />
      <Separator className="mt-20" />
      <HomePlan content={content} />
    </Page>
  );
}
export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const events = await prisma.event.findMany({
    select: {
      slug: true,
    },
  });

  const paths = events.flatMap((event) => [
    { params: { slug: event.slug }, locale: "en" },
    { params: { slug: event.slug }, locale: "fr" },
  ]);

  return {
    paths,
    fallback: false,
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

  const page = await prisma.page.findUnique({
    where: {
      slug: "home",
    },
  });

  if (!event || !page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: JSON.parse(locale === "en" ? page.content_en : page.content_fr),
      event: formatClientEvent(event, locale),
    },
  };
}
