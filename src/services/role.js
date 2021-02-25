const { Op } = require("sequelize");
import { Role } from "../models";

export const getAll = async (filters = {}) => {
  const options = {};

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

  const roles = await Role.findAll(options);

  return roles;
};
