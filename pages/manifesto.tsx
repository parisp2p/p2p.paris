import { Page } from "@/components/Page";
import { Locale, ManifestoPage } from "@/utils/pageTypes";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";

export default function Manifesto({ content }: { content: ManifestoPage }) {
  return (
    <Page
      meta={() => (
        <Head>
          <title>{content.title}</title>
        </Head>
      )}
    >
      <div className=" mt-10 mb-5 flex w-full gap-4">
        <h1 className="uppercase font-bold">{content.title}_</h1>
        <div className="h-6 w-full bg-[#282828]" />
      </div>
      <div className="mb-[200px]">
        {content.content.map((contentItem) => (
          <>
            {contentItem.text.map((item) => (
              <div
                key={item}
                className="uppercase leading-[40px] tracking-wider"
              >
                {contentItem.type === "title" ? (
                  <h2 key={item} className="">
                    {item}
                  </h2>
                ) : (
                  <p key={item} className="text-gray-999">
                    {item}
                  </p>
                )}
              </div>
            ))}
          </>
        ))}
      </div>
    </Page>
  );
}

export async function getStaticProps({ locale }: { locale: Locale }) {
  const prisma = new PrismaClient();
  const page = await prisma.page.findUnique({
    where: {
      slug: "manifesto",
    },
  });
  await prisma.$disconnect();

  if (!page) {
    return {
      notFound: true,
    };
  }

  let content = page.content_en;
  if (locale === "fr") {
    content = page.content_fr;
  }

  return {
    props: {
      content,
    },
  };
}
