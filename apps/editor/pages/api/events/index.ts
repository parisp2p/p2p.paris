import { isEditorUser } from "@/utils/auth";
import { db } from "@/utils/back/db";
import { Event } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const getEvents = async (res: NextApiResponse) => {
  try {
    const events = await db.event.findMany();
    res.status(200).json(events);
  } catch (e) {
    res.status(500).json({ message: `Error fetching events: ${e}` });
  }
};

const createEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body as Event;
    console.log(body);
    const event = await db.event.create({
      data: {
        ...body,
      },
    });
    res.status(201).json(event);
  } catch (e) {
    res.status(500).json({ message: `Error creating events: ${e}` });
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
    await getEvents(res);
  } else if (req.method === "POST") {
    await createEvent(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
