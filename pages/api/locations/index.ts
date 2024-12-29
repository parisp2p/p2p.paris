import { db } from "@/utils/back/db";
import type { NextApiRequest, NextApiResponse } from "next";

const getLocations = async (res: NextApiResponse) => {
  try {
    const events = await db.location.findMany();
    res.status(200).json(events);
  } catch (e) {
    res.status(500).json({ message: `Error fetching location: ${e}` });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    await getLocations(res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
