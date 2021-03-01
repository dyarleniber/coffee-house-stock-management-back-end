const { Op } = require("sequelize");
import { Notification, User, Product } from "../models";
import { MANAGER_ROLE } from "../constants/role";
import paginationConfig from "../config/pagination";
import NotFound from "../errors/NotFound";
import Forbidden from "../errors/Forbidden";

export const getAll = async (page = 1, user, filters = {}) => {
  const limit = paginationConfig.defaultLimit;
  const offset = (page - 1) * limit;

  const options = {
    offset,
    limit,
    order: [["id", "DESC"]],
    where: {
      userId: user.id,
    },
  };

  const { search } = filters;
  if (search) {
    options.where = {
      ...options.where,
      [Op.or]: [
        { id: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  const {
    count: total,
    rows: notifications,
  } = await Notification.findAndCountAll(options);

  const totalPages = Math.ceil(total / limit);

  return {
    notifications,
    total,
    totalPages,
    page,
    limit,
  };
};

export const missingProductsNotification = async (product) => {
  const minimumQuantity = 45;
  const quantityExists =
    product.quantity !== undefined && product.quantity !== "";
  if (quantityExists && product.quantity < minimumQuantity) {
    if (!product.name && product.id) {
      const productById = await Product.findByPk(product.id);
      product.name = productById.name;
    }

    let notification;
    notification =
      "Please, proceed with the replacement of the product %PRODUCT%.";
    notification = notification.replace("%PRODUCT%", product.name);

    const users = await User.findAll();
    if (!users) {
      return;
    }

    const bulkCreationArray = users.map((user) => ({
      userId: user.id,
      description: notification,
    }));

    await Notification.bulkCreate(bulkCreationArray);
  }
};

export const productRefilledNotification = async (product, user) => {
  const quantityExists =
    product.quantity !== undefined && product.quantity !== "";
  if (quantityExists) {
    if (!product.name && product.id) {
      const productById = await Product.findByPk(product.id);
      product.name = productById.name;
    }

    let notification;
    notification =
      "Stock of the product %PRODUCT% was refilled to %QUANTITY% by the user %USER%.";
    notification = notification.replace("%PRODUCT%", product.name);
    notification = notification.replace("%QUANTITY%", product.quantity);
    notification = notification.replace("%USER%", user.name);

    const users = await User.findAll({ where: { roleId: MANAGER_ROLE } });
    if (!users) {
      return;
    }

    const bulkCreationArray = users.map((user) => ({
      userId: user.id,
      description: notification,
    }));

    await Notification.bulkCreate(bulkCreationArray);
  }
};

export const destroy = async (id, user) => {
  const notification = await Notification.findByPk(id);
  if (!notification) {
    throw new NotFound("Notification not found");
  }

  if (notification.userId != user.id) {
    throw new Forbidden("You are not the notification owner");
  }

  await Notification.destroy({ where: { id } });
};
