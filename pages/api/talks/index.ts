import { isEditorUser } from "@/utils/auth";
import { db } from "@/utils/back/db";
import { Talk } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const getTalks = async (res: NextApiResponse) => {
  try {
    const Talks = await db.talk.findMany();
    res.status(200).json(Talks);
  } catch (e) {
    res.status(500).json({ message: `Error fetching Talks: ${e}` });
  }
};

const createTalk = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body as Talk;

    const Talk = await db.talk.create({
      data: {
        ...body,
      },
    });
    res.status(201).json(Talk);
  } catch (e) {
    res.status(500).json({ message: `Error creating Talks: ${e}` });
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
    await getTalks(res);
  } else if (req.method === "POST") {
    await createTalk(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
