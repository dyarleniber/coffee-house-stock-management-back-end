import path from "path";
import { putObject, deleteObject, getObjectUrl } from "../lib/s3";

const sanitizeFileName = (name) =>
  name.replace(/[^a-z0-9]/gi, "_").toLowerCase();

const generateUniqueId = () => Math.floor(Math.random() * Date.now());

export const storeFile = async (filePath, fileName, file) => {
  const baseFileName = sanitizeFileName(fileName);
  const uniqueId = generateUniqueId();
  const ext = path.extname(file.originalname);
  const uniqueFileName = `${baseFileName}-${uniqueId}${ext}`;

  const key = filePath ? [filePath, uniqueFileName].join("/") : uniqueFileName;
  const body = file.buffer;
  const contentType = file.mimetype;

  await putObject(key, body, contentType);

  return key;
};

export const deleteFile = async (key) => {
  await deleteObject(key);
};

export const getFileUrl = async (key) => {
  const url = await getObjectUrl(key);

  return url;
};
