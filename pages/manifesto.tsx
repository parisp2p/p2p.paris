import { Page } from "@/components/Page";
import {
  generatePageTypeByLocale,
  Locale,
  PageContent,
} from "@/utils/pageTypes";
import Head from "next/head";

export default function Manifesto({ content }: { content: PageContent }) {
  return (
    <Page
      meta={() => (
        <Head>
          <title>{content.manifesto.title}</title>
        </Head>
      )}
    >
      <div className=" mt-10 mb-5 flex w-full gap-4">
        <h1 className="uppercase font-bold">{content.manifesto.title}_</h1>
        <div className="h-6 w-full bg-[#282828]" />
      </div>
      <div className="mb-[200px]">
        {content.manifesto.content.map((contentItem) => (
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
  const page = generatePageTypeByLocale(locale);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: page,
    },
    revalidate: 60,
  };
}
