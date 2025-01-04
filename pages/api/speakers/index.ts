import { db } from "@/utils/back/db";
import { Speaker } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const getSpeakers = async (res: NextApiResponse) => {
  try {
    const speakers = await db.location.findMany();
    res.status(200).json(speakers);
  } catch (e) {
    res.status(500).json({ message: `Error fetching Speakers: ${e}` });
  }
};

const createSpeaker = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body as Speaker;

    const speaker = await db.speaker.create({
      data: {
        ...body,
      },
    });
    res.status(201).json(speaker);
  } catch (e) {
    res.status(500).json({ message: `Error creating Speaker: ${e}` });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    await getSpeakers(res);
  } else if (req.method === "POST") {
    await createSpeaker(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
