import { isEditorUser } from "@/utils/auth";
import { db } from "@/utils/back/db";
import { Location } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const getLocations = async (res: NextApiResponse) => {
  try {
    const locations = await db.location.findMany();
    res.status(200).json(locations);
  } catch (e) {
    res.status(500).json({ message: `Error fetching Locations: ${e}` });
  }
};

const createLocation = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body as Location;

    const location = await db.location.create({
      data: {
        ...body,
      },
    });
    res.status(201).json(location);
  } catch (e) {
    res.status(500).json({ message: `Error creating Locations: ${e}` });
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
    await getLocations(res);
  } else if (req.method === "POST") {
    await createLocation(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
