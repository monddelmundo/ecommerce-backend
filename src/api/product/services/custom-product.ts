// src/api/product/services/product.ts
import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::product.product",
  ({ strapi }) => ({
    async findUniqueCategories() {
      const products = await strapi.entityService.findMany(
        "api::product.product",
        {
          sort: {
            category: "asc",
          },
        }
      );

      const unique = [
        ...new Map(
          products.map((product) => [product.category, product.category])
        ).values(),
      ];

      return unique;
    },
  })
);
