const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userController = require("./controllers/userController.js");
const loginController = require("./controllers/loginController.js");
const cookieController = require("./controllers/cookieController.js");
const Linkedin = require("node-linkedin")("app-id", "secret", "callback");
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.options('*', cors());

app.use('/login', 
  // loginController.oAuth, 
  // loginController.fake,
  (req, res) => {
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, (err, res) => {
      if (err) return console.error(err);
      console.log({res});
      return res.redirect('/home')
    })
    // return res.status(200).send('success');
  });

app.use('/logout', 
cookieController.deleteCookie, 
(req, res) => { 
  return res.status(200).redirect('/')
});

// app.use('/home', (req, res) => console.log('WHAT UP!'))

app.use('/home',
loginController.fake,
userController.verifyUser,
userController.createUser,
(req, res) => {
  return res.status(200).json(res.locals.user)
})

app.use('/newJob', (req, res) => {
  return res.status(200).json(res.locals.job);
})

app.use('/moveJob', (req, res) => {
  return res.status(200).json(res.locals.job) // CHANGE
})

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