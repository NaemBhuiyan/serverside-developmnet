const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
var session = require("express-session");
var FileStore = require("session-file-store")(session);
var passport = require("passport");

var authenticate = require("./authenticate");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const promoRouter = require("./routes/promoRouter");
const dishRouter = require("./routes/dishRouter");
const leaderRouter = require("./routes/leaderRouter");
const uploadRouter = require("./routes/uploadRouter");

var config = require("./config");

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then(
  (db) => {
    console.log("connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser("12345-67890-09876-54321"));
// app.use(
//   session({
//     name: "session-id",
//     secret: "12345-67890-09876-54321",
//     saveUninitialized: false,
//     resave: false,
//     store: new FileStore(),
//   })
// );
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(express.static(path.join(__dirname, "views")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/promotions", promoRouter);
app.use("/dishes", dishRouter);
app.use("/leaders", leaderRouter);
app.use("/imageUpload", uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
