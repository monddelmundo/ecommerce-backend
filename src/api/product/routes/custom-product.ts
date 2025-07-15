export default {
  routes: [
    // 🆕 Your custom route (does NOT override anything)
    {
      method: "GET",
      path: "/products/unique-categories",
      handler: "custom-product.uniqueCategories",
      config: {
        policies: [],
        auth: false, // ✅ adjust based on your access rules
      },
    },
  ],
};
