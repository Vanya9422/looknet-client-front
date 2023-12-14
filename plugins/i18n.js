export default (ctx) => {
  ctx.app.router.pushOrig = ctx.app.router.push;
  ctx.app.router.resolveOrig = ctx.app.router.resolve;
  ctx.app.router.push = (location, onComplete, onAbort) => {
    const route = ctx.app.localeRoute(location, ctx.i18n.locale);
    if (route) {
      return ctx.app.router.pushOrig.call(ctx.app.router, route, onComplete, onAbort);
    }
  };
  ctx.redirectOrig = ctx.redirect;
  ctx.redirect = (status, path, query) => {
    const localePath = ctx.app.localePath(path, ctx.i18n.locale);
    return ctx.redirectOrig(status, localePath, query);
  };
}
