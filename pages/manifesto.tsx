import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import {
  generatePageTypeByLocale,
  Locale,
  PageContent,
} from "@/utils/pageTypes";
import Head from "next/head";

export default function Manifesto({ content }: { content: PageContent }) {
  return (
    <>
      <Head>
        <title>{content.manifesto.title}</title>
      </Head>
      <div className="flex flex-col items-center w-full min-h-screen">
        <div className="max-w-[1344px] w-full flex flex-col items-center px-8">
          <Header />
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
          <Footer content={content.home} />
        </div>
      </div>
    </>
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
