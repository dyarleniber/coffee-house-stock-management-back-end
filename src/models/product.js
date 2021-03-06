"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.Category, {
        as: "category",
        foreignKey: {
          name: "categoryId",
          allowNull: false,
          type: DataTypes.INTEGER,
        },
      });

      this.belongsTo(models.Image, {
        as: "image",
        foreignKey: {
          name: "imageId",
          allowNull: false,
          type: DataTypes.INTEGER,
        },
      });
    }
  }

  Product.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      description: {
        type: DataTypes.STRING,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
      sumQuantity: {
        type: DataTypes.VIRTUAL,
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      timestamps: true,
      underscored: true,
    }
  );

  return Product;
};
