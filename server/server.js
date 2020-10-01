const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const PORT = 8080;
const apiRouter = require("./routers/api");

const cors = require('cors');

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
