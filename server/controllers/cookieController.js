const { User } = require("../models/model");

const cookieController = {};

cookieController.isLoggedIn = async (req, res, next) => {
  console.log("=====> req.cookies.user is logged in: ", req.cookies.user)
  const token = req.cookies.user;
  
  if (req.cookies.provider === "linkedin") {
    const result = await User.findOne({ token: token });
    console.log("=====> cookieController.isLoggedIn findOne result: ", result)
    if (result) {
    console.log("user exists already. redirecting to user's page");
    // findOne in the database, see accessToken
    // if we can't find them, return next();
    // verify existing cookie req.cookies.user = accessToken
    return res.redirect("http://localhost:3000/main");
    } else {
      return res.redirect("http://localhost:3000")
    }
  };
  if (!req.cookies.user || !req.cookies.provider || req.cookies.provider !== "linkedin") return next();
  
  // Anything else, just go back to main site
  return res.redirect("http://localhost:3000")
  // return next({
  //   log: `User is not logged in.`,
  //   code: 401,
  //   message: { err: "User is not logged in." },
  // });
};

cookieController.setCookie = (req, res, next) => {
  if (res.locals.token) {
    console.log("====> cookieController.setCookie first line hit!");
    res.cookie("provider", "linkedin", { httpOnly: true });
    res.cookie("user", res.locals.token, { httpOnly: true });
    return next();
  } else {
    return next({
      log: `An error occurred while setting a new cookie. No res.locals.token exists: ${err}`,
      message: {
        err:
          "An error occurred in cookieController.setCookie. Check server for more details",
      },
    });
  }
};

cookieController.deleteCookie = (req, res, next) => {
  console.log("====> cookieController.deleteCookie first line hit!");
  res.clearCookie("provider");
  res.clearCookie("user");
  return next();
};

module.exports = cookieController;