import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async uniqueCategories(ctx) {
      const categories = await strapi
        .service("api::product.custom-product")
        .findUniqueCategories();
      ctx.body = categories;
    },
  })
);
