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
      imageSize: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      imageType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      imageUrl: {
        type: DataTypes.VIRTUAL,
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
