import Header from '@/components/Header';
import { Triptic } from '@/components/Triptic';
import { defaultPagesContent, HomePage } from '@/utils/pageTypes';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';

const Button = ({ text }: { text: string }) => (
  <button className="uppercase border border-white px-4 py-2  hover:cursor">
    {text}
  </button>
);

const Separator = () => (
  <div className="border w-full border-[#282828] mt-10"></div>
);

export default function Home({ content }: { content: HomePage }) {
  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <header></header>

      <div className="flex flex-col w-3/4 mx-auto gap-16 justify-between">
        <Header />
        <div className="flex flex-col gap-8">
          <Triptic>
            <div className="flex flex-col gap-6 text-center items-center w-full mt-0">
              <h2 className="text-xl uppercase">{content.hero.title}_</h2>
              <Image
                src="/images/paris-p2p-logo.svg"
                width={200}
                height={200}
                alt="Paris P2P"
              />
              <p className="text-xl uppercase">{content.hero.subtitle}</p>
              <p className="uppercase text-sm text-gray-500">
                {content.hero.description}
              </p>
              <Button text={content.hero.btn.text} />
            </div>

            <div className="flex flex-col gap-6 text-center items-center">
              <h2 className="text-xl uppercase">{content.hero.title}_</h2>
              <Image
                src="/images/paris-p2p-logo.svg"
                width={200}
                height={200}
                alt="Paris P2P"
              />
              <p className="text-xl uppercase">{content.hero.subtitle}</p>
              <p className="uppercase text-sm text-gray-500">
                {content.hero.description}
              </p>
              <Button text={content.hero.btn.text} />
            </div>

            <div className="flex flex-col gap-6 text-center items-center">
              <h2 className="text-xl uppercase">{content.hero.title}_</h2>
              <Image
                src="/images/paris-p2p-logo.svg"
                width={200}
                height={200}
                alt="Paris P2P"
              />
              <p className="text-xl uppercase">{content.hero.subtitle}</p>
              <p className="uppercase text-sm text-gray-500">
                {content.hero.description}
              </p>
              <Button text={content.hero.btn.text} />
            </div>
          </Triptic>

          <div className="flex gap-8 mx-auto">
            <Button text={content.hero.btn.text} />
            <Button text={content.hero.btn.text} />
          </div>
        </div>

        <Separator />

        <div className="flex flex-col">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl uppercase">Our events_</h2>

            <div className="flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border border-[#282828]">
                <div className="min-h-48 border border-[#282828] flex flex-col justify-between p-6">
                  <h3 className="uppercase text-lg">5 Days</h3>
                  <p className="uppercase text-sm text-gray-500">
                    {content.hero.description}
                  </p>
                </div>
                <div className="min-h-48 border border-[#282828] flex flex-col justify-between p-6">
                  <h3 className="uppercase text-lg">5 Days</h3>
                  <p className="uppercase text-sm text-gray-500">
                    {content.hero.description}
                  </p>
                </div>
                <div className="min-h-48 border border-[#282828] flex flex-col justify-between p-6">
                  <h3 className="uppercase text-lg">5 Days</h3>
                  <p className="uppercase text-sm text-gray-500">
                    {content.hero.description}
                  </p>
                </div>
                <div className="min-h-48 border border-[#282828] flex flex-col justify-between p-6">
                  <h3 className="uppercase text-lg">5 Days</h3>
                  <p className="uppercase text-sm text-gray-500">
                    {content.hero.description}
                  </p>
                </div>
              </div>

              <div className="flex">
                <Image
                  width={10000}
                  height={80}
                  src="/images/texture-full.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col">
          <div className="mx-auto flex flex-col gap-6">
            <h2 className="text-2xl uppercase">Support us_</h2>

            <div className="flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-0 border border-[#282828]">
                <div className="border border-[#282828] min-h-48 flex flex-col justify-between p-6">
                  <h3 className="uppercase text-lg">5 Days</h3>
                  <div className="flex w-full justify-between">
                    <p className="uppercase text-sm text-gray-500">
                      {content.hero.description}
                    </p>
                    <Button text="Donate" />
                  </div>
                </div>
              </div>

              <div className="flex">
                <Image
                  width={10000}
                  height={80}
                  src="/images/texture-full.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer></footer>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const prisma = new PrismaClient();

  //const page = await prisma.page.findUnique({ where: { slug: 'home' } });

  const page = defaultPagesContent['home'];
  page.content_en = JSON.stringify(page.en);
  page.content_fr = JSON.stringify(page.fr);

  if (!page) {
    return {
      notFound: true,
    };
  }

  if (locale === 'en') {
    return {
      props: {
        content: JSON.parse(page.content_en),
      },
      revalidate: 60, // optional
    };
  }

  if (locale === 'fr') {
    return {
      props: {
        content: JSON.parse(page.content_fr),
      },
      revalidate: 60, // optional
    };
  }

  return {
    notFound: true,
  };
}
