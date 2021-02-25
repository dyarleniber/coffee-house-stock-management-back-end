const { Op } = require("sequelize");
import { Category } from "../models";
import paginationConfig from "../config/pagination";

export const getAll = async (page = 1, filters = {}) => {
  const limit = paginationConfig.defaultLimit;
  const offset = (page - 1) * limit;

  const options = { offset, limit };

  const { search } = filters;
  if (search) {
    options.where = {
      [Op.or]: [
        { id: { [Op.like]: `%${search}%` } },
        { name: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  const { count: total, rows: categories } = await Category.findAndCountAll(
    options
  );

  const totalPages = Math.ceil(total / limit);

  return {
    categories,
    total,
    totalPages,
    page,
  };
};

export const create = async (data) => {
  const category = await Category.create(data, {
    fields: ["name", "maxQuantity"],
  });

  return category;
};

export const get = async (id) => {
  const category = await Category.findByPk(id);

  return category;
};

export const update = async (id, data) => {
  await Category.update(data, {
    where: { id },
    fields: ["name", "maxQuantity"],
  });
};

export const destroy = async (id) => {
  await Category.destroy({ where: { id } });
};
