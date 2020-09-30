// const { LinkedIn } = require('linkedinAPI')
const loginController = {};
const uuid = require('uuid')
const fetch = require('node-fetch')
const Linkedin = require('node-linkedin')('app-id', 'secret', 'callback');
require("dotenv").config();

const baseURI = "https://www.linkedin.com/oauth/v2/authorization";
const clientID ="860exmlhesujye";
const clientSecret = "8pufmbYSk8WPXaog";
const redirectURI = "http://localhost:3000/login/linkedin"; 
// const redirectURI = "http://192.168.0.28:3000"; 
const state = uuid.v4();
const scope = "r_liteprofile%20r_emailaddress";

loginController.test = (req, res, next) => {
  console.log(loginController.test);
  return next();
}
loginController.oAuth = (req, res, next) => {
  console.log('loginController.oAuth')
  // 1. Get request to oauth URL
  // 2. Client gets served up LinkedIn login page and approves
  // 3. Post request that gets sent to LinkedIn 
  // 4. Approval instructs LinkedIn to redirect the member to the callback URL, which is another get request
  // 5. In THAT get request, we have to save the req.code and req. state, which we need to save to get the access token
  res.locals.url = `${baseURI}?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&state=${state}&scope=${scope}`;
  // fetch(`${baseURI}?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&state=${state}&scope=${scope}`);
  console.log('======> checking to see if anything hits after res.redirect')
  return next();
};

loginController.afterConsent = (req, res, next) => {
  console.log("loginController.afterConsent hits");
  const code = req.query.code;
  
  const url = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${redirectURI}&client_id=${clientID}&client_secret=${clientSecret}`;

  fetch(url, {
     method: "POST",
   })
     .then((res) => res.json())
     .then((response) => {
       res.locals.provider = "linkedin";
       res.locals.token = response.access_token;
       return next();
     })
     .catch((err) => console.log(err));
};

module.exports = loginController;