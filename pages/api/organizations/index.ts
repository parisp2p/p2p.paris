import { isEditorUser } from "@/utils/auth";
import { db } from "@/utils/back/db";
import { Organization } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const getOrganizations = async (res: NextApiResponse) => {
  try {
    const organizations = await db.organization.findMany();
    res.status(200).json(organizations);
  } catch (e) {
    res.status(500).json({ message: `Error fetching Organizations: ${e}` });
  }
};

const createOrganization = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const body = req.body as Organization;
    const organization = await db.organization.create({
      data: {
        ...body,
      },
    });
    res.status(201).json(organization);
  } catch (e) {
    res.status(500).json({ message: `Error creating Organizations: ${e}` });
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
    await getOrganizations(res);
  } else if (req.method === "POST") {
    await createOrganization(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
