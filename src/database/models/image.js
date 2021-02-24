"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {}

  Image.init(
    {
      imageKey: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      imageUrl: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      imageType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Image",
      tableName: "images",
      timestamps: true,
      underscored: true,
    }
  );

  return Image;
};
