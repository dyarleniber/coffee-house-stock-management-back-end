"use strict";

import initialCategories from "../../config/initialCategories";

module.exports = {
  up: async (queryInterface) => {
    for (const initialCategory of initialCategories) {
      await queryInterface.bulkInsert(
        "categories",
        [
          {
            name: initialCategory.name,
            max_quantity: initialCategory.maxQuantity,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
