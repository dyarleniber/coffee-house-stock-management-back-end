const { Op } = require("sequelize");
import { User, Role } from "../models";
import { hash } from "../utils/hash";
import BadRequest from "../errors/BadRequest";
import paginationConfig from "../config/pagination";

export const getAll = async (page = 1, filters = {}) => {
  const limit = paginationConfig.defaultLimit;
  const offset = (page - 1) * limit;

  const options = {
    include: [{ model: Role, as: "role" }],
    attributes: { exclude: ["password"] },
    offset,
    limit,
  };

  const { search } = filters;
  if (search) {
    options.where = {
      [Op.or]: [
        { id: { [Op.like]: `%${search}%` } },
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  const { count: total, rows: users } = await User.findAndCountAll(options);

  const totalPages = Math.ceil(total / limit);

  return {
    users,
    total,
    totalPages,
    page,
  };
};

export const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

export const create = async (data) => {
  const userByEmail = await getByEmail(data.email);
  if (userByEmail) {
    throw new BadRequest("E-mail already registered");
  }

  data.password = await hash(data.password);

  const user = await User.create(data, {
    fields: ["name", "email", "password", "roleId"],
  });

  return user;
};

export const get = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

export const update = async (id, data) => {
  if (data.email) {
    const userByEmail = await getByEmail(data.email);
    if (userByEmail && userByEmail.id != id) {
      throw new BadRequest("E-mail already registered");
    }
  }

  if (data.password) {
    data.password = await hash(data.password);
  }

  await User.update(data, {
    where: { id },
    fields: ["name", "email", "password", "roleId"],
  });
};

export const destroy = async (id) => {
  await User.destroy({ where: { id } });
};
