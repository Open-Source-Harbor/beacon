const { models } = require("mongoose");
const { User } = require("../models/model");
const userController = {};

// userController.verifyUser = (req, res, next) => {
//   console.log('=====> first line of userController.verifyUser hit')
//   const { provider } = req. cookies;
//   const token = req.cookies.user;
//   let decoded;
//   let email;

//   try {
//     console.log('query', req.query)
//     console.log(req.params.code);
//     console.log('req params ', req.params)
//     const oauthResponse = req.body;
//     console.log('oauth response in verify user', oauthResponse);

//     await User.find(oauthResponse, (err, user) => {
//       if (err) return next('err in finding user in verify user', error)
//       if (!user) {
//         console.log('no user found');
//         return next();
//       } else {
//         res.locals.user = user;
//         return next();
//       }
//     })
//   } catch (err) {
//     return next({
//       log: `An error occurred while verifying user: ${err}`,
//       message: { err: "An error occurred in userController.verifyUser. Check server for more details" },
//     });
//   }
// }

userController.createUser = async (req, res, next) => {
  try {
    if (!res.locals.user || !res.locals.user.l_id) return next();
    const query = { 'l_id': res.locals.user.l_id }
    await User.findOneAndUpdate(query, res.locals.user, {upsert: true}, (err, doc) => {
      if (err) return res.send(500, {error: `error occured in userController.createUser: ${err}`});
      return next();
    });
  } catch (err) {
    return next({
      log: `An error occurred while creating user: ${err}`,
      message: { err: "An error occurred in userController.createUser. Check server for more details" },
    });
  }
};

userController.getUser = async (req, res, next) => {
  try {
    console.log("IN getUser");
    const token = req.cookies.user;
    console.log("token", token);

    const user = await User.findOne({ token: token });

    res.locals.user = user;
    console.log("res.locals,user", user);

    return next();
  } catch (err) {
    return next({
      log: `An error occurred while fetching dummy user: ${err}`,
      message: {
        err:
          "An error occurred in userController.getDummyUser. Check server for more details",
      },
    });
  }
};


userController.createDummyUser = async (req, res, next) => {
  try {
    const dummy = req.body;

    await User.create(dummy, (err, dumUser) => {
      console.log('dummy ', dumUser);
      res.locals.user = dumUser;
      return next();
    })

  } catch (err) {
    return next({
      log: `An error occurred while creating dummy user: ${err}`,
      message: { err: "An error occurred in userController.createDummyUser. Check server for more details" },
    });
  }
}

userController.getDummyUser = async (req, res, next) => {
  try {
    console.log('IN getDummyUser', )
    const { userId } = req.body;
    console.log('userId', userId)

    const user = await User.findOne({ _id: userId });

    res.locals.user = user;
    console.log('res.locals,user', user);

    return next();

  } catch (err) {
    return next({
      log: `An error occurred while fetching dummy user: ${err}`,
      message: { err: "An error occurred in userController.getDummyUser. Check server for more details" },
    });
  }
}


module.exports = userController;
