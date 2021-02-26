import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Config from "../config/s3";

const getClient = () => {
  const { accessKeyId, secretAccessKey, region } = s3Config;

  const s3 = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });

  return s3;
};

export const putObject = async (key, body, contentType) => {
  const s3 = getClient();

  const { bucket } = s3Config;
  const objectParams = {
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  };

  const results = await s3.send(new PutObjectCommand(objectParams));
  return results;
};

export const deleteObject = async (key) => {
  const s3 = getClient();

  const { bucket } = s3Config;
  const objectParams = {
    Bucket: bucket,
    Key: key,
  };

  const results = await s3.send(new DeleteObjectCommand(objectParams));
  return results;
};

export const getObjectUrl = async (key) => {
  const s3 = getClient();

  const { bucket, expiresIn } = s3Config;
  const objectParams = {
    Bucket: bucket,
    Key: key,
  };

  const getObjectCommand = new GetObjectCommand(objectParams);

  const url = await getSignedUrl(s3, getObjectCommand, { expiresIn });
  return url;
};
