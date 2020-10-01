const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const loginController = require("../controllers/loginController");
const cookieController = require("../controllers/cookieController");
const userController = require("../controllers/userController");
require("dotenv").config();

const baseURL = "https://www.linkedin.com/oauth/v2/accessToken";
const grant_type = "authorization_code";
const redirect_uri = "http://localhost:3000";
const CLIENT_SECRET = "8pufmbYSk8WPXaog";
const CLIENT_ID = "860exmlhesujye";

router.use(
  "/linkedin**",
  loginController.requestToken,
  loginController.getUserNamePhoto,
  loginController.getUserEmail,
  cookieController.setCookie,
  userController.createUser,
  (req, res) => {
    return res.redirect(redirect_uri);
  }
);



module.exports = router;
