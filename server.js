// --------------------- External Modules
const express = require("express");
const path = require('path');
const methodOverride = require("method-override");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// --------------------- Internal Modules
const db = require("./models");
const controllers = require("./controllers");


// --------------------- Instanced Modules
const app = express();


// --------------------- Configuration
const PORT = 4000;
app.set("view engine", "ejs");

// --------------------- Middleware
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
})

app.use(session({
  resave: false,
  saveUninitialized: false, 
  secret: "Trassshhh", 
  store: new MongoStore({
    url: "mongodb://localhost:27017/impact-sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2 
    }
  }));
 
const authRequired = function(req, res, next) {
  if(!req.session.currentUser) {
    return res.redirect("/login");
  }
  next();
}


// --------------------- Routes


// view, home page
app.get("/home", function (req, res)  {
    res.render("index");
});

// Auth Routes

app.use("/auth", controllers.auth);

// User Route
app.use("/user", controllers.user);

// Product Route
app.use("/products", controllers.product);


// --------------------- Server Listener
app.listen(PORT, function () {
    console.log(`Server is live and listening at http://localhost:${PORT}`);
  });