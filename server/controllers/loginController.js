const loginController = {};
const fetch = require('node-fetch')
require("dotenv").config();

const redirectURI = "http://localhost:8080/api/linkedin"; 

loginController.requestToken = async (req, res, next) => {
  try {
    console.log("=====> process.env.CLIENT_ID: ", process.env.CLIENT_ID)
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
          console.log("=====> name & photo fetch response: ", response);
          res.locals.user = {};
          if (response.id) res.locals.user.l_id = response.id;
          if (response.firstName) res.locals.user.firstName = response.firstName.localized.en_US;
          if (response.lastName) res.locals.user.lastName = response.lastName.localized.en_US;
          if (response.profilePicture) res.locals.user.photo = response.profilePicture.displayImage;
          console.log("res.locals.user after first FETCH: ", res.locals.user);
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
          // console.log("=====> email fetch response: ", response);
          if (response.elements) res.locals.user.email = response.elements[0].handle;
          console.log('final user object: ', res.locals.user);
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