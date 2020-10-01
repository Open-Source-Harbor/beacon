const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const cookieController = require("../controllers/cookieController");
const userController = require("../controllers/userController");
const jobController = require("../controllers/jobController");
require("dotenv").config();



router.use(
  "/login",
  cookieController.isLoggedIn,
  loginController.requestToken,
  loginController.getUserNamePhoto,
  loginController.getUserEmail,
  cookieController.setCookie,
  userController.createUser,
  (req, res) => {
    return res.redirect("http://localhost:3000/main");
  }
);

router.use("/user", 
  // userController.verifyUser,
  userController.getUser,
  (req, res) => {
    return res.send(200).json(res.locals.user);
    // return res.redirect("http://localhost:3000/main");
  }
);

router.use("/logout", cookieController.deleteCookie, (req, res) => {
  return res.redirect("http://localhost:3000/");
});

// Creates a job for a specific user, and automatically puts in interestedIn column
// INPUT => 
// {
//   "newJob": {
//     ...
//   },
//   "userId": "..."
// }
router.post('/createJob',
jobController.createJob,
(req, res) => {
  return res.status(200).json(res.locals.job)
})

// Fetches all jobs for one user
// INPUT => "userId"
router.post('/getJobs',
userController.getDummyUser,
jobController.getJobs,
(req, res) => {
  return res.status(200).json(res.locals.jobs)
})

// Creates a user
// INPUT is whatever fields from the User Model that you want to input
router.post('/createUser',
userController.createDummyUser,
(req, res) => {
  return res.status(200).json(res.locals.user)
})

// fetches all info on user
// INPUT => "userId"
router.post('/getUser', 
userController.getDummyUser,
(req, res) => {
  return res.status(200).json(res.locals.user);
})

// moves job between columns in database
// INPUT => a shit ton...
router.post('/moveJob',
jobController.moveJob,
(req, res) => {
  return res.status(200).json({ user: res.locals.user, job: res.locals.job })
})

router.post('/archive',
jobController.archive,
(req, res) => {
  return res.status(200).json();
})


module.exports = router;
