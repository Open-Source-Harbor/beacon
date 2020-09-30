const { User } = require("../models/model");
const userController = {};

userController.verifyUser = async (req, res, next) => {
  console.log('hi')
  try {
    console.log('query', req.query)
    console.log(req.params.code);
    console.log('req params ', req.params)
    const oauthResponse = req.body;
    console.log('oauth response in verify user', oauthResponse);

    await User.find(oauthResponse, (user, error) => {
      if (error) return next('error in finding user in verify user', error)
      if (!user) {
        console.log('no user found');
        return next();
      } else {
        res.locals.user = user;
        return next();
      }
    })
  } catch (err) {
    return next({
      log: `An error occurred while verifying user: ${err}`,
      message: { err: "An error occurred in userController.verifyUser. Check server for more details" },
    });
  }
}

userController.createUser = async (req, res, next) => {
  try {
    if (res.locals.user) return next();

    const newUser = req.body;
    await User.create(newUser).then((newUser) => {
      res.locals.user = newUser;
      return next();
    });
  } catch (err) {
    return next({
      log: `An error occurred while creating user: ${err}`,
      message: { err: "An error occurred in userController.createUser. Check server for more details" },
    });
  }
};


module.exports = userController;