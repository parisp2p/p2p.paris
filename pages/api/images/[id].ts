import { db } from "@/utils/back/db";
import { getFileFromBucket } from "@/utils/back/files";
import { type NextApiRequest, type NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== "string")
    return res.status(400).json({ message: "Invalid request" });

  const file = await db.image.findUnique({
    where: {
      id,
    },
  });

  if (!file) {
    return res.status(404).json({ message: "Item not found" });
  }

  // get the file from the bucket and pipe it to the response object
  const data = await getFileFromBucket({
    bucketName: process.env.S3_BUCKET_NAME as string,
    filename: file.filename,
  });

  if (!data) {
    return res.status(404).json({ message: "Item not found" });
  }
  // set header for download file
  res.setHeader(
    "content-disposition",
    `attachment; filename="${file.original_filename}"`,
  );

  // pipe the data to the res object
  data.pipe(res);
}

export default handler;
