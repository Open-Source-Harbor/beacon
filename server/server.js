const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const callback = require("./routes/callback");
const logger = require("morgan");
const PORT = 8080;

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
app.use(express.static(path.resolve(__dirname, "public")));
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/callback", function (req, res, next) {
//   console.log("inside callback route");
//   requestAccessToken(req.query.code, req.query.state)
//     .then((response) => {
//       requestProfile(response.body.access_token).then((response) => {
//         console.log(response.body);
//         res.render("callback", { profile: response.body });
//       });
//     })
//     .catch((error) => {
//       res.status(500).send(`${error}`);
//       console.error(error);
//     });
// });


// THIS FIXES CORS ISSUE
app.use((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.end();
});


app.get("/login", loginController.test, loginController.oAuth, (req, res) => {
  return res.redirect(res.locals.url);
});

app.get(
  "/login/linkedin",
  loginController.afterConsent,
  (req, res) => {
    return res.redirect("/");
  }
);






// // app.use(methodOverride());


// app.use(session({ 
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true
// }))

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// passport.use(
//   new LinkedInStrategy(
//     {
//       consumerKey: clientID,
//       consumerSecret: clientSecret,
//       callbackURL: callbackURL,
//     },
//     function (token, tokenSecret, profile, done) {
//       User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//     }
//   )
// );

// app.get("/account", ensureAuthenticated, function (req, res) {
//   res.render("account", { user: req.user });
// });

// app.get("/login", function (req, res) {
//   res.render("login", { user: req.user });
// });

// app.get(
//   "/auth/linkedin",
//   passport.authenticate("linkedin", {
//     scope: ["r_basicprofile", "r_emailaddress"],
//   })
// );

// app.get(
//   "/auth/linkedin/callback",
//   passport.authenticate("linkedin", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("/");
//   }
// );

// app.use("/logout", function (req, res) {
//   req.logout();
//   return res.redirect("/");
// });


// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/login");
// }

// const config = {
//  client: {
//    id: clientID, 
//    secret: clientSecret, 
//  },
//  auth: {
//    tokenHost: 'https://www.linkedin.com/oauth/v2/authorization'
//  }
// };

// app.get('/auth', (req, res) => {
//   console.log(authorizationURI);
//   return res.redirect(authorizationURI);
// });

//  // Callback service parsing the authorization token and asking for the access token
// app.get('/callback', async (req, res) => {
//     const { code } = req.query;
//     const options = {
//       code,
//     };
//     try {
//       const accessToken = await client.getToken(options);
//       console.log('The resulting token: ', accessToken.token);
//       return res.status(200).json(accessToken.token);
//     } catch (error) {
//       console.error('Access Token Error', error.message);
//       return res.status(500).json('Authentication failed');
//     }
//   });

//  app.get("/", (req, res) => {
//    res.send('Hello<br><a href="/auth">Log in with LinkedIn</a>');
//  });


// app.get('/', (req, res) => {
//    return res.sendFile('index.html',{
//       root:'public'
//    })
// });

// app.get('/redirect', (req, res) => {
//   const redirectUri = oauth2.authorizationCode.authorizeURL({
//     response_type:"code",
//     redirect_uri: "http://www.localhost:3000/callback",
//     state: "some-cryptic-stuff-98471871987981247"
//   });
//   return res.redirect(redirectUri);
// });

// app.get('/callback',(req, res) => {
//   console.log("linkedin-callback route invoked");
//   return res.send("linked in callback working")
// });

// passport.use(new LinkedInStrategy ({
//   clientID: clientID,
//   clientSecret: clientSecret,
//   callbackURL: callbackURL,
//   scope: ['r_emailaddress', 'r_liteprofile'],
//   state: true,
//   passReqToCallback: true
// }, (req, accessToken, refreshToken, profile, done) => {
//   req.session.accessToken = accessToken; // Access token is now saved in req.session.accesstoken variable
//   process.nextTick(() => done(null, profile));
// }));



// app.use('/auth/linkedin', passport.authenticate('linkedin', (req, res) => {
//   // Request will be redirected to LinkedIn for authentication, so function will not be called
//   console.log('Request redirected');
// }));

// app.use('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }), 
// (req, res) => res.redirect('/'))

// app.use("/logout", function (req, res) {
//   req.logout();
//   return res.redirect("/");
// });

// app.use("/", (req, res) =>
//   res.status(200).sendFile(path.resolve(__dirname, "../client/public/index.html"))
// );

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

app.use("/", (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, "../public/index.html"))
);

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