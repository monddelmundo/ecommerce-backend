export default {
  async logout(ctx) {
    console.log("test");
    ctx.cookies.set("jwtToken", null, {
      path: "/",
      expires: new Date(0),
    });

    ctx.send({ message: "Logged out successfully" });
  },
};
