"use strict";

import { hash } from "../../utils/hash";
import defaultManager from "../../config/defaultManager";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: defaultManager.name,
          email: defaultManager.email,
          password: await hash(defaultManager.password),
          role_id: defaultManager.roleId,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
