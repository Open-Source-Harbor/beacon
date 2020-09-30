const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  res.cookie("provider", "linkedin", { httpOnly: true });
  res.cookie("user", res.locals.token, { httpOnly: true });
  return next();
};

cookieController.isLoggedIn = (req, res, next) => {
  if (req.cookies.user) return next();
  return next({
    log: `User is not logged in.`,
    code: 401,
    message: { err: "User is not logged in." },
  });
};

cookieController.deleteCookie = (req, res, next) => {
  res.clearCookie("provider");
  res.clearCookie("user");
  return next();
};

module.exports = cookieController;