import multer from "multer";
import fs from "fs";

export const uploadImage = async (req, res) => {
  const uploadedFiles = [];
  const { path, originalname } = req.files[0];
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  const final = newPath.replace(
    "C:\\Users\\Ljubo\\Documents\\GitHub\\Tiktokclone\\backend\\uploads\\",
    ""
  );
  fs.renameSync(path, newPath);
  uploadedFiles.push(final);
  res.json(filename);
  console.log(filename);
};

export const uploadVideo = (req, res) => {
  const { path, filename } = req.file;
  res.json(filename);
};
