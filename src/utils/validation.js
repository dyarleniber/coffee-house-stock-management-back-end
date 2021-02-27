import * as yup from "yup";
import fileUploadConfig from "../config/fileUpload";

export const getFileValidation = (
  fileSize,
  fileFormats,
  fileSizeMessage = "The file size is too large",
  fileFormatMessage = "The file format is not supported"
) => {
  return yup
    .mixed()
    .test(
      "fileSize",
      fileSizeMessage,
      (value) => !value || value.size <= fileSize
    )
    .test(
      "fileFormat",
      fileFormatMessage,
      (value) => !value || fileFormats.includes(value.mimetype)
    );
};

export const getImageValidation = () => {
  const imageSize = fileUploadConfig.imageSizeInMB * 1024 * 1024;
  const imageFormats = fileUploadConfig.imageFormats;

  const validation = getFileValidation(
    imageSize,
    imageFormats,
    "The image size is too large",
    "The image format is not supported"
  );

  return validation;
};
