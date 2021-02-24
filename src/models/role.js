"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {}

  Role.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
      timestamps: true,
      underscored: true,
    }
  );

  return Role;
};
