// --------------------- External Modules
const express = require("express");
const path = require('path');
const methodOverride = require("method-override");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);



// --------------------- Internal Modules
const db = require("./models");
const controllers = require("./controllers");
const {authRequired} = require('./controllers/auth');




// --------------------- Instanced Modules
const app = express();




// --------------------- Configuration
require("dotenv").config();
const PORT = process.env.PORT;
app.set("view engine", "ejs");



// --------------------- Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
})

app.use(session({
  resave: false,
  saveUninitialized: false, 
  secret: process.env.SECRET, 
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2 
    }
  }));

  //https://stackoverflow.com/questions/37183766/how-to-get-the-session-value-in-ejs
  app.use(function(req, res, next) {
    res.locals.user = req.session.currentUser;
    next();
  });
 

// --------------------- Routes

// view, home page
app.get("/", function (req, res)  {
    res.render("index", { user: req.session.currentUser });
});

// About Routes

app.get("/about", (req, res) => {
  res.render("about", { user: req.session.currentUser });
  });

// Auth Routes

app.use("/auth", controllers.auth);

// User Route
app.use("/users", authRequired, controllers.user);


// Product Route
app.use("/products", controllers.product);


// --------------------- Server Listener
app.listen(PORT, function () {
    console.log(`Server is live and listening at http://localhost:${PORT}`);
  });