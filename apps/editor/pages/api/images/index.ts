import { isEditorUser } from "@/utils/auth";
import { db } from "@/utils/back/db";
import { saveFileInBucket } from "@/utils/back/files";
import { IncomingForm, type File } from "formidable";
import fs from "fs";
import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const bucketName = process.env.S3_BUCKET_NAME as string;

type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, {});
  if (!isEditorUser(session)) {
    res.status(401);
    return;
  }

  // Get files from request using formidable
  const files = await new Promise<ProcessedFiles | undefined>(
    (resolve, reject) => {
      const form = new IncomingForm();
      const files: ProcessedFiles = [];
      form.on("file", function (field, file) {
        files.push([field, file]);
      });
      form.on("end", () => resolve(files));
      form.on("error", (err) => reject(err));
      form.parse(req, () => {
        //
      });
    },
  ).catch((e) => {
    console.error(e);
    res.status(500).json({ error: "Error parsing files" });
    return undefined;
  });

  if (files?.length) {
    // Upload files to S3 bucket
    try {
      const x = await Promise.all(
        files.map(async ([_, fileObject]) => {
          const file = fs.createReadStream(fileObject?.filepath);
          // generate unique file name
          const filename = `${nanoid(5)}-${fileObject?.originalFilename}`;
          // Save file to S3 bucket and save file info to database concurrently
          await saveFileInBucket({
            bucketName,
            filename,
            file,
          });
          // save file info to database
          const image = await db.image.create({
            data: {
              original_filename: fileObject?.originalFilename || "",
              filename,
              bucket: bucketName,
            },
          });

          return {
            id: image.id,
          };
        }),
      );
      res.status(200).json({ files: x });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error saving files" });
      return;
    }
  }

  res.status(400).json({ error: "No files found" });
};

// Disable body parser built-in to Next.js to allow formidable to work
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
