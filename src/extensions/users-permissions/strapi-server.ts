import bcrypt from "bcryptjs";
export default (plugin) => {
  console.log("Plugin initiated");
  plugin.controllers.auth = {
    ...plugin.controllers.auth(strapi),
    callback: async (ctx) => {
      console.log("Custom login triggered");

      const { identifier, password } = ctx.request.body;

      // const userService = strapi.plugin("users-permissions").service("user");
      const user = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: { email: identifier },
        });
      console.log({ user });

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        ctx.status = 401;
        ctx.body = { error: "Unauthorized: Invalid username/password" };
        return;
      }
      const jwt = await strapi
        .plugin("users-permissions")
        .service("jwt")
        .issue({ id: user.id });

      const contentType = strapi.contentType("plugin::users-permissions.user");
      const sanitizedUser = await strapi.contentAPI.sanitize.output(
        user,
        contentType
      );

      ctx.cookies.set("jwtToken", jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      ctx.send({ user: sanitizedUser });
    },
    logout: require("./controllers/auth").default.logout,
  };

  plugin.routes["content-api"].routes.push({
    method: "POST",
    path: "/auth/logout",
    handler: "auth.logout",
    config: {
      auth: false,
      policies: [],
    },
  });

  return plugin;
};
