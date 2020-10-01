const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const callback = require("./routers/api");
const logger = require("morgan");
const PORT = 8080;
const apiRouter = require("./routers/api");

const cors = require('cors');
// const session = require('express-session');

// const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require("simple-oauth2");
// const methodOverride = require('method-override');
// const userController = require("./controllers/userController.js");
const loginController = require("./controllers/loginController.js");
// const cookieController = require("./controllers/cookieController.js");
// const { User } = require("./models/model");
// const passport = require('passport');
// const LinkedInStrategy = require('passport-linkedin').Strategy;
// const uuid = require("uuid");


// // LinkedIn 
// const baseURI = "https://www.linkedin.com/oauth/v2/authorization";
// const clientSecret = "8pufmbYSk8WPXaog";
// const clientID = "860exmlhesujye";
// // const redirectURI = "http://localhost:3000/home"; 
// const redirectURI = "http://192.168.0.28:3000/callback"; 
// const state = uuid.v4().replace(/-/g, "").slice(0, 17);
// const scope = "r_liteprofile%20r_emailaddress";
// const authorizationURI = `${baseURI}?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&state=${state}&scope=${scope}`;

// const Linkedin = require("node-linkedin")(clientID, clientSecret);
// // const callbackURL = "http://localhost:3000/auth/linkedin/callback"; 
// const callbackURL = "http://192.168.0.28:3000/auth/linkedin/callback"; 

app.use(cors());
// app.use(express.static(path.resolve(__dirname, "public")));
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API ROUTER
app.use('/api', apiRouter)

// SERVES INDEX.HTML FILE ON ROUTE '/'
// app.get("/", (req, res) =>
//   res.status(200).sendFile(path.resolve(__dirname, "../public/index.html"))
// );

app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
});

module.exports = app;
