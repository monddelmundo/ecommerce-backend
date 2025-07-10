export default () => {
  return async (ctx, next) => {
    const token = ctx.cookies.get("jwtToken");
    if (token) {
      ctx.request.header.authorization = `Bearer ${token}`;
    }
    console.log(ctx.request.header.authorization);
    await next();
  };
};
