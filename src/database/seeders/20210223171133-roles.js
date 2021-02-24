"use strict";

import roles from "../../config/roles";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (const role of roles) {
      await queryInterface.bulkInsert(
        "roles",
        [
          {
            id: role.id,
            name: role.name,
            description: role.description,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
