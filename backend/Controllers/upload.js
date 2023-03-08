import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const bucket = "gymtok-photo-video-upload";

// UPLOAD TO S3
async function uploadToS3(path, orignalFilename, mimetype) {
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = orignalFilename.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + "." + ext;

  const data = await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

export const uploadImage = async (req, res) => {
  const uploadedFiles = [];
  const { path, originalname, mimetype } = req.files[0];
  /*const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  const final = newPath.replace(
    "C:\\Users\\Ljubo\\Documents\\GitHub\\Tiktokclone\\backend\\uploads\\",
    ""
  );
  fs.renameSync(path, newPath);
  uploadedFiles.push(final);
  res.json(final);
  const finalFinal = final.replace(
    "/opt/render/project/src/backend/uploads/",
    ""
  );
  console.log(finalFinal);*/
  const url = await uploadToS3(path, originalname, mimetype);
  uploadedFiles.push(url);
  res.json(uploadedFiles);
};

export const uploadVideo = async (req, res) => {
  const { path, filename, mimetype } = req.file;
  const url = await uploadToS3(path, filename, mimetype);
  res.json(url);
};
