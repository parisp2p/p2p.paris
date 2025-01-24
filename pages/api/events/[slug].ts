import { isEditorUser } from "@/utils/auth";
import { db } from "@/utils/back/db";
import { Event } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const updateEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const body = req.body as Event;
    const event = await db.event.update({
      where: {
        slug: slug as string,
      },
      data: {
        ...body,
      },
    });
    res.status(200).json(event);
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
    await updateEvent(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
