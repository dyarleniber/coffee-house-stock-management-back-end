"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {}

  Category.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      maxQuantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      sumQuantity: {
        type: DataTypes.VIRTUAL,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      timestamps: true,
      underscored: true,
    }
  );

  return Category;
};
