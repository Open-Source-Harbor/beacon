const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const cookieController = require("../controllers/cookieController");
const userController = require("../controllers/userController");
require("dotenv").config();

router.use(
  "/linkedin**",
  loginController.requestToken,
  loginController.getUserNamePhoto,
  loginController.getUserEmail,
  cookieController.setCookie,
  userController.createUser,
  (req, res) => {
    return res.redirect("http://localhost:3000/main");
  }
);

router.use("/logout", (req, res) => {
  return res.redirect("http://localhost:3000");
});

module.exports = router;
