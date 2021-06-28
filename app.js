const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const User = require("./models/user");
const session = require("express-session");
const mongoose = require("mongoose");
engine = require("ejs-mate");
var methodOverride = require("method-override");
// require routes
const index = require("./routes/index");
const posts = require("./routes/posts");
const reviews = require("./routes/reviews");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/surf-shop", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// use ejs-locals for all ejs templates:
app.engine("ejs", engine);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// set public assets directory
app.use(express.static("public"));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// Configure Passport and Sessions
app.use(
  session({
    secret: "hang ten dude!",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set local variables middleware
app.use(function (req, res, next) {
  // set default page title
  res.locals.title = "Surf Shop";
  // set success flash message
  res.locals.success = req.session.success || "";
  delete req.session.success;
  // set error flash message
  res.locals.error = req.session.error || "";
  delete req.session.error;
  // continue on to next function in middleware chain
  next();
});

// Mount routes
app.use("/", index);
app.use("/posts", posts);
app.use("/posts/:id/reviews", reviews);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  console.log(err);
  req.session.error = err.message;
  res.redirect("back");
});
let port = 3009;

app.listen(port);

module.exports = app;
