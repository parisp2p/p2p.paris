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

import { formatClientEvent } from "@/utils/helpers";
const Separator = ({ className = "" }: { className?: string }) => (
  <div className={`border w-full border-[#282828] mt-10 ${className}`}></div>
);

export default function Home({
  event,
  content,
}: {
  content: PageContent;
  event: ClientEvent;
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
      <HomeEventsSection content={content.home} />
      <TextureSeparatorComponent className="border-0 border-b-[1px] border-r-[1px]" />
      <HomeButtonsSection content={content.home} />
      <HomeEventsHighlights content={content.home} />
      <HomeDonate content={content.home} />
      <HomeCoOrg content={content.home} />
      <HomeSchedule content={content.home} talks={event.talks} />
      <Separator />
      <HomeSpeakers content={content.home} speakers={event.speakers} />
      <Separator />
      <HomeInformation content={content.home} />
      <Separator className="mt-20" />
      <HomePlan content={content.home} />
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

  const page = generatePageTypeByLocale(locale);

  return {
    props: {
      content: page,
      event: formatClientEvent(event, locale),
    },
  };
}
