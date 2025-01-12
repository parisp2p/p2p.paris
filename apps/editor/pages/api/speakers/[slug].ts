import { isEditorUser } from "@/utils/auth";
import { db } from "@/utils/back/db";
import { Speaker } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const updateSpeaker = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const body = req.body as Speaker;
    const speaker = await db.speaker.update({
      where: {
        slug: slug as string,
      },
      data: {
        ...body,
      },
    });
    res.status(200).json(speaker);
  } catch {
    res.status(400).json({ message: "Bad format" });
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

  if (req.method === "PUT") {
    await updateSpeaker(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
