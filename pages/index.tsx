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
import { ClientSpeaker } from "@/types/client";
import {
  generatePageTypeByLocale,
  Locale,
  PageContent,
} from "@/utils/pageTypes";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";

const Separator = ({ className = "" }: { className?: string }) => (
  <div className={`border w-full border-[#282828] mt-10 ${className}`}></div>
);

export default function Home({
  content,
  speakers,
}: {
  content: PageContent;
  speakers: ClientSpeaker[];
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
      <HomeSchedule content={content.home} />
      <Separator />
      <HomeSpeakers content={content.home} speakers={speakers} />
      <Separator />
      <HomeInformation content={content.home} />
      <Separator className="mt-20" />
      <HomePlan content={content.home} />
    </Page>
  );
}

export async function getStaticProps({ locale }: { locale: Locale }) {
  const prisma = new PrismaClient();

  const speakers = await prisma.speaker.findMany({
    include: {
      talks: true,
    },
    take: 22,
  });
  const page = generatePageTypeByLocale(locale);

  return {
    props: {
      content: page,
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
