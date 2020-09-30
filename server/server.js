const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const userController = require("./controllers/userController.js");
const loginController = require("./controllers/loginController.js");
const cookieController = require("./controllers/cookieController.js");
const { User } = require("./models/model");
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const uuid = require("uuid");
const PORT = 8080;

// LinkedIn 
const clientSecret = "8pufmbYSk8WPXaog";
const clientID = "860exmlhesujye";
const Linkedin = require("node-linkedin")(clientID, clientSecret);
// const callbackURL = "http://localhost:3000/auth/linkedin/callback"; 
const callbackURL = "http://192.168.0.28:3000/auth/linkedin/callback"; 

const state = uuid.v4().replace(/-/g, '').slice(0, 17);

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// extra from jsonworld
app.use(session({ 
  secret: uuid.v4().slice(0,5),
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

// extra from jsonworld
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LinkedInStrategy ({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: callbackURL,
  scope: ['r_emailaddress', 'r_liteprofile'],
  state: true,
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  req.session.accessToken = accessToken; // Access token is now saved in req.session.accesstoken variable
  process.nextTick(() => done(null, profile));
}));

app.use((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.end();
});

app.use('/auth/linkedin', passport.authenticate('linkedin', (req, res) => {
  // Request will be redirected to LinkedIn for authentication, so function will not be called
  console.log('Request redirected');
}));

app.use('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }), 
(req, res) => res.redirect('/'))

app.use("/logout", function (req, res) {
  req.logout();
  return res.redirect("/");
});

app.use("/", (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, "../public/index.html"))
);

// app.use('/login', 
//   loginController.oAuth, 
  // loginController.fake,
  // (req, res) => {
    // Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, (err, res) => {
    //   if (err) return console.error(err);
    //   console.log({res});
    //   return res.redirect('/home')
    // })
  //   return res.status(200).json('success');
  // });

// app.use('/logout', 
// cookieController.deleteCookie, 
// (req, res) => { 
//   return res.status(200).redirect('/')
// });

// app.use('/home', (req, res) => console.log('WHAT UP!'))

// app.use('/home',
// loginController.fake,
// userController.verifyUser,
// userController.createUser,
// (req, res) => {
//   return res.status(200).json(res.locals.user)
// })

// app.use('/newJob', (req, res) => {
//   return res.status(200).json(res.locals.job);
// })

// app.use('/moveJob', (req, res) => {
//   return res.status(200).json(res.locals.job) // CHANGE
// })




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