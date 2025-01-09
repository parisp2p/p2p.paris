import { db } from "@/utils/back/db";
import { Location } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const updateLocation = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { slug } = req.query;
    const body = req.body as Location;
    const location = await db.location.update({
      where: {
        slug: slug as string,
      },
      data: {
        ...body,
      },
    });
    res.status(200).json(location);
  } catch {
    res.status(400).json({ message: "Bad format" });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "PUT") {
    await updateLocation(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
