import { isEditorUser } from "@/utils/auth";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, {});
  if (!isEditorUser(session)) {
    res.status(401);
    return;
  }
  if (req.method === "PUT") {
    try {
      const { slug } = req.query;
      const { content_en, content_fr } = req.body;
      const updatedPage = await prisma.page.update({
        where: {
          slug: slug as string,
        },
        data: {
          content_en: JSON.stringify(content_en),
          content_fr: JSON.stringify(content_fr),
        },
      });
      res.status(200).json(updatedPage);
    } catch {
      res.status(400).json({ message: "Bad format" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
