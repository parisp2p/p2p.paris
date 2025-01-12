import { isEditorUser } from "@/utils/auth";
import { db } from "@/utils/back/db";
import { Page } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const getPages = async (res: NextApiResponse) => {
  try {
    const pages = await db.page.findMany();
    res.status(200).json(pages);
  } catch (e) {
    res.status(500).json({ message: `Error fetching Pages: ${e}` });
  }
};

const createPage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body as Page;
    console.log(body);
    const page = await db.page.create({
      data: {
        ...body,
      },
    });
    res.status(201).json(page);
  } catch (e) {
    res.status(500).json({ message: `Error creating Pages: ${e}` });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, {});
  if (!isEditorUser(session)) {
    res.status(401);
    return;
  }

  if (req.method === "GET") {
    await getPages(res);
  } else if (req.method === "POST") {
    await createPage(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
