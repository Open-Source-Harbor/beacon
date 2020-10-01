const { User } = require("../models/model");
const loginController = {};
const fetch = require('node-fetch')
const fs = require("fs");
const path = require('path')
require("dotenv").config();

const baseURI = "https://www.linkedin.com/oauth/v2/authorization";
const redirectURI = "http://localhost:8080/api/login"; 
const authorizationURI = `${baseURI}?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${redirectURI}&state=${process.env.STATE}&scope=${process.env.SCOPE}`;

loginController.isLoggedIn = async (req, res, next) => {
  try {
    console.log("=====> req.cookies.user is logged in: ", req.cookies.user);
    const token = req.cookies.user;
    console.log("loginController.isLoggedIn token: ", token);

    // A) If either of the cookies don't exist, or if the provider isn't linkedin, move onto next middleware
    if (!req.cookies.user || !req.cookies.provider || req.cookies.provider !== "linkedin") {
      console.log("going to next piece of middleware: ");
      return next();
    }

    // B) If 2 cookies exist, token and provider cookie is linkedin:
    if (token && req.cookies.provider === "linkedin") {
      // 1) Query database for user
      const result = await User.findOne({ token: token });
      console.log("=====> loginController.isLoggedIn findOne result: ", result);
      // 1A) If user doesn't exist in database, go to next midddleware to create new account
      // 1B) If user exists in database, re-route to frontend, 3000/main
      if (!result) {
        console.log("loginController.isLoggedIn db query is null: ", result);
        return next();
      } else {
        console.log("user exists already. redirecting to user's page");
        fs.writeFileSync(path.resolve(__dirname, "../temp.json"), JSON.stringify(token));
        return res.redirect("http://localhost:3000/main");
      }
    }

    // C) Anything else, just go back to main site
    return res.redirect("http://localhost:3000");
  } catch (err) {
    console.log(`error occured during loginController.isLoggedIn: ${err}`);
  }
};

// loginController.oAuth = (req, res, next) => {
//   try {
//     console.log("=====> first line of loginController.OAuth, process.env.CLIENT_ID: ",process.env.CLIENT_ID);
//     // console.log("=====>loginController.afterConsent hits");
//     fetch(authorizationURI)
//       // .then(res => console.log(`loginController.oAuth fetch request raw response: ${res}`))
//       // .catch(err => console.log(`error occurred during loginController.oAuth GET request`));
//   } catch (err) {
//     return next({
//       log: `An error occurred while getting access token: ${err}`,
//       message: {
//         err:
//           "An error occurred in loginController.requestToken. Check server for more details",
//       },
//     });
//   }
// }

loginController.requestToken = async (req, res, next) => {
  try {
    console.log("=====> first line of loginController.requestToken, process.env.CLIENT_ID: ", process.env.CLIENT_ID)
    // console.log("=====>loginController.afterConsent hits");
    const code = req.query.code;
    console.log('======>code: ', code);
    const authURL = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${redirectURI}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;
    await fetch(authURL, {
      method: "POST",
    })
      .then((res) => {
        console.log('=====>res: ', res);
        return res.json();
      })
      .then((response) => {
        console.log('=====>response: ', response)
        res.locals.provider = "linkedin";
        res.locals.token = response.access_token;
        console.log('=====> res.locals.token: ', res.locals.token);
      })
      .catch((err) => console.log('error occured in LinkedIn OAuth post request:', err));
    return next();
  } catch (err) {
      return next({
        log: `An error occurred while getting access token: ${err}`,
        message: {
          err:
            "An error occurred in loginController.requestToken. Check server for more details",
        },
      });
  };
};

loginController.getUserNamePhoto = async (req, res, next) => {
  try {
    console.log("=====>loginController.getUserNamePhoto");
    await fetch(
      "https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))",
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${res.locals.token}`,
        },
        keepalive: true,
      }
    )
      .then((res) => {
        console.log("=====> name & photo fetch res: ", res);
        return res.json();
      })
      .then((response) => {
        if (response) {
          // console.log("=====> name & photo fetch response 1: ", response);
          // console.log("=====> name & photo fetch response 2: ", response.profilePicture['displayImage~'].paging);
          // console.log("=====> name & photo fetch response 3: ", response.profilePicture["displayImage~"].elements[0]);
          // console.log("=====> name & photo fetch response 3: ", response.profilePicture["displayImage~"].elements[0].identifiers);
          // console.log("=====> name & photo fetch response 4: ", response.profilePicture["displayImage~"].elements[0].data);
          // console.log("=====> name & photo fetch response 5: ", response.profilePicture["displayImage~"].elements[0].data['com.linkedin.digitalmedia.mediaartifact.StillImage']);
          res.locals.user = {};
          if (response.id) res.locals.user.l_id = response.id;
          if (response.firstName) res.locals.user.firstName = response.firstName.localized.en_US;
          if (response.lastName) res.locals.user.lastName = response.lastName.localized.en_US;
          if (response.profilePicture) res.locals.user.photo =
            response.profilePicture["displayImage~"].elements[0].identifiers[0].identifier;
          res.locals.user.token = res.locals.token;
          // console.log("res.locals.user after first FETCH: ", res.locals.user);
        };
      })
      .catch((err) =>
        console.log("error occured in fetching LinkedIn user name & photo request: ", err)
      );
      console.log('should hit after namePhoto fetch');
      return next();
  } catch (err) {
     return next({
       log: `An error occurred while getting user name & photo: ${err}`,
       message: {
         err:
           "An error occurred in loginController.getUserNamePhoto. Check server for more details",
       },
     });
  }
};

loginController.getUserEmail = async (req, res, next) => {
  try { // console.log("=====>loginController.getUserEmail");
    await fetch("https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))", {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${res.locals.token}`,
      },
      keepalive: true,
    })
      .then((res) => {
        // console.log("=====> email fetch res: ", res);
        return res.json();
      })
      .then((response) => {
        if (response) {
          console.log("=====> email fetch response: ", response);
          console.log("=====> email fetch response: ", response.elements[0]['handle~'].emailAddress);
          if (response.elements) {
            res.locals.user.email = response.elements[0]['handle~'].emailAddress;
            console.log('final user object: ', res.locals.user);
            fs.writeFileSync(path.resolve(__dirname, "../temp.json"), JSON.stringify(res.locals.user));
          }
        }
      })
      .catch((err) =>
        console.log("error occured in fetching LinkedIn user email request: ", err)
      );
      // console.log('====> getUserEmail last line!');
      return next();
  } catch (err) {
    return next({
      log: `An error occurred while getting user email: ${err}`,
      message: {
        err:
          "An error occurred in loginController.getUserEmail. Check server for more details",
      },
    });
  }
};

module.exports = loginController;