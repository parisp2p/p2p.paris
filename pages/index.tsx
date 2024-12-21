import { HomePage } from '@/utils/pageTypes';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';

export default function Home({ content }: { content: HomePage }) {
  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <div className="flex justify-center">
        <Image
          src="/images/paris-p2p-logo.svg"
          width={200}
          height={200}
          alt="Paris P2P"
        />
      </div>

      <div className="flex justify-center">
        <h1 className="text-4xl font-bold">{content.title}</h1>
      </div>
      <footer></footer>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const prisma = new PrismaClient();
  const page = await prisma.page.findUnique({ where: { slug: '/' } });

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
