const { Op } = require("sequelize");
import { Category } from "../models";

export const getAll = async (filters = {}) => {
  const options = {};

  const { search } = filters;
  if (search) {
    options.where = {
      [Op.or]: [
        { id: { [Op.like]: `%${search}%` } },
        { name: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  const categories = await Category.findAll(options);

  return categories;
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
