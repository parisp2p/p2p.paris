import { Locale, SpeakerPage } from "@/utils/pageTypes";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";

import { Page } from "@/components/Page";
import { Speaker } from "@/components/Speaker";
import { Button } from "@/components/ui/button";
import { ClientSpeaker } from "@/types/client";
import { formatClientSpeaker } from "@/utils/helpers";
import Image from "next/image";

export default function Speakers({
  content,
  speakers,
}: {
  content: SpeakerPage;
  speakers: ClientSpeaker[];
}) {
  return (
    <Page
      meta={() => (
        <Head>
          <title>{content.title}</title>
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
          <h1 className="uppercase font-bold">{content.title}_</h1>
        </div>
        <Button variant="outline" className="uppercase">
          {content.becomeSpeaker}
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
  const page = await prisma.page.findUnique({
    where: {
      slug: "speaker",
    },
  });

  if (!page) {
    return {
      notFound: true,
    };
  }

  await prisma.$disconnect();

  return {
    props: {
      content: JSON.parse(locale === "fr" ? page.content_fr : page.content_en),
      speakers: speakers.map((t) => formatClientSpeaker(t, locale)),
    },
  };
}
