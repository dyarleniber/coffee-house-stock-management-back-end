"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "userId",
          allowNull: false,
          type: DataTypes.INTEGER,
        },
      });
    }
  }

  Notification.init(
    {
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Notification",
      tableName: "notifications",
      timestamps: true,
      underscored: true,
    }
  );

  return Notification;
};
