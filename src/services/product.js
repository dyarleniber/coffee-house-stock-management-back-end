const { Op } = require("sequelize");
import { Product, Category, Image } from "../models";
import { get as getCategory } from "../services/category";
import { storeFile, deleteFile, getFileUrl } from "../utils/fileStorage";
import BadRequest from "../errors/BadRequest";
import NotFound from "../errors/NotFound";
import paginationConfig from "../config/pagination";

export const getAll = async (page = 1, filters = {}) => {
  const limit = paginationConfig.defaultLimit;
  const offset = (page - 1) * limit;

  const options = {
    include: [{ model: Category, as: "category" }],
    offset,
    limit,
  };

  const { search } = filters;
  if (search) {
    options.where = {
      [Op.or]: [
        { id: { [Op.like]: `%${search}%` } },
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  const { count: total, rows: products } = await Product.findAndCountAll(
    options
  );

  const totalPages = Math.ceil(total / limit);

  return {
    products,
    total,
    totalPages,
    page,
    limit,
  };
};

const storeImage = async (data, file) => {
  const filePath = "products";
  const fileName = data.name;
  const imageKey = await storeFile(filePath, fileName, file);

  const { size: imageSize, mimetype: imageType } = file;

  return { imageKey, imageSize, imageType };
};

export const create = async (data, file) => {
  const category = await getCategory(data.categoryId);
  if (!category) {
    throw new BadRequest("Invalid category");
  }

  const imageData = await storeImage(data, file);
  const image = await Image.create(imageData, {
    fields: ["imageKey", "imageSize", "imageType"],
  });

  const product = await Product.create(
    { ...data, imageId: image.id },
    {
      fields: [
        "name",
        "description",
        "quantity",
        "price",
        "categoryId",
        "imageId",
      ],
    }
  );

  return product;
};

export const get = async (id) => {
  const product = await Product.findOne({
    include: [
      { model: Category, as: "category" },
      { model: Image, as: "image" },
    ],
    where: { id },
  });

  if (!product) {
    throw new NotFound("Product not found");
  }

  product.image.imageUrl = await getFileUrl(product.image.imageKey);

  return product;
};

export const update = async (id, data) => {
  await Product.update(data, {
    where: { id },
    fields: ["name", "description", "quantity", "price", "categoryId"],
  });
};

export const updateQuantity = async (id, quantity) => {
  await Product.update({ quantity }, { where: { id } });
};

export const updateFile = async (id, file) => {
  const product = await Product.findOne({
    include: [{ model: Image, as: "image" }],
    where: { id },
  });

  if (!product) {
    throw new NotFound("Product not found");
  }

  const imageData = await storeImage(product, file);
  const newImage = await Image.create(imageData, {
    fields: ["imageKey", "imageSize", "imageType"],
  });

  await Product.update({ imageId: newImage.id }, { where: { id } });

  await deleteFile(product.image.imageKey);

  await Image.destroy({ where: { id: product.image.id } });
};

export const destroy = async (id) => {
  const product = await Product.findOne({
    include: [{ model: Image, as: "image" }],
    where: { id },
  });

  if (!product) {
    throw new NotFound("Product not found");
  }

  await Product.destroy({ where: { id } });

  await deleteFile(product.image.imageKey);

  await Image.destroy({ where: { id: product.image.id } });
};
