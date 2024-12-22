import { PrismaClient } from '@prisma/client';
import { defaultPagesContent } from '../utils/pageTypes';

export default async function populateDb() {
  const prisma = new PrismaClient();

  // 1 - Create pages from default data

  for (const page of Object.keys(defaultPagesContent)) {
    // @ts-expect-error - each page has a different type
    // which we don't need to explicit here
    const contentEn = defaultPagesContent[page]['en'];
    // @ts-expect-error - each page has a different type
    // which we don't need to explicit here
    const contentFr = defaultPagesContent[page]['fr'];

    await prisma.page.create({
      data: {
        slug: page,
        content_en: JSON.stringify(contentEn),
        content_fr: JSON.stringify(contentFr),
      },
    });
  }

  prisma.$disconnect();
}

populateDb()
  .catch((e) => {
    throw e;
  })
  .then(async () => {
    console.log('[+] Database populated');
  });
