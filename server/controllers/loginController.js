// const { LinkedIn } = require('linkedinAPI')
const loginController = {};
const uuid = require('uuid')
const fetch = require('node-fetch')
const Linkedin = require('node-linkedin')('app-id', 'secret', 'callback');

const baseURI = "https://www.linkedin.com/oauth/v2/authorization";
const clientID ="860exmlhesujye";
const redirectURI = "http://localhost:3000/home"; 
const state = uuid.v4();
console.log({state});
const scope = "r_liteprofile%20r_emailaddress";

loginController.oAuth = (req, res, next) => {
  // 1. Get request to oauth URL
  // 2. Client gets served up LinkedIn login page and approves
  // 3. Post request that gets sent to LinkedIn 
  // 4. Approval instructs LinkedIn to redirect the member to the callback URL, which is another get request
  // 5. In THAT get request, we have to save the req.code and req. state, which we need to save to get the access token
  
  fetch(`${baseURI}?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&state=${state}&scope=${scope}`);
  console.log('======> checking to see if anything hits after res.redirect')
  return next();
};

loginController.fake = (req, res, next) => {
  console.log('loginController.fake hits');
  console.log(req.query)
  return next();
}

module.exports = loginController;