import {
  generatePageTypeByLocale,
  Locale,
  PageContent,
} from "@/utils/pageTypes";
import Head from "next/head";
import { PrismaClient } from "@prisma/client";

import { ClientSpeaker } from "@/types/client";
import Image from "next/image";
import { Page } from "@/components/Page";
import { Speaker } from "@/components/Speaker";
import { Button } from "@/components/ui/button";
import { formatClientSpeaker } from "@/utils/helpers";

export default function Speakers({
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
          <title>{content.speaker.title}</title>
        </Head>
      )}
    >
      <div className="flex justify-between items-center mt-10 mb-5 w-full">
        <div className="flex gap-3 items-center">
          <Image
            src="/icons/mic.svg"
            alt="Speaker icon"
            height={24}
            width={24}
          />
          <h1 className="uppercase font-bold">{content.speaker.title}_</h1>
        </div>
        <Button variant="outline" className="uppercase">
          {content.speaker.becomeSpeaker}
        </Button>
      </div>

      <div className="mb-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {speakers.map((speaker) => (
          <Speaker key={speaker.slug} {...speaker} />
        ))}
      </div>
    </Page>
  );
}

export async function getStaticProps({ locale }: { locale: Locale }) {
  const prisma = new PrismaClient();
  const speakers = await prisma.speaker.findMany({
    include: {
      talks: true,
    },
  });
  const page = generatePageTypeByLocale(locale);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: page,
      speakers: speakers.map((t) => formatClientSpeaker(t, locale)),
    },
    revalidate: 60,
  };
}
