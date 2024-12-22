// pages/api/upload.ts
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import formidable from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ROOT_USER!,
    secretAccessKey: process.env.S3_ROOT_PASSWORD!,
  },
  forcePathStyle: true,
});

// We must disable the default body parsing because we're using formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error parsing file.' });
    }

    const file = files.file; // The key 'file' is based on your frontend upload
    const fileStream = fs.createReadStream(file.filepath);

    try {
      const s3Result = await s3.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: file.originalFilename, // Consider generating a unique filename
          Body: fileStream,
          ContentType: file.mimetype, // e.g. 'image/png'
        })
      );

      // The URL for your file in S3:
      // e.g., https://<BUCKET_NAME>.s3.<REGION>.amazonaws.com/<FILE_KEY>
      const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.originalFilename}`;

      // (Optional) store the URL in the database if you have an entity in mind
      // const saved = await prisma.myModel.create({ data: { imageUrl } });

      return res.status(200).json({ imageUrl });
    } catch (uploadError) {
      console.error(uploadError);
      return res.status(500).json({ error: 'Error uploading file.' });
    }
  });
}
