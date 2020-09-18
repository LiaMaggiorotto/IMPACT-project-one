// --------------------- External Modules
const express = require("express");
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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session({
    resave: false,
    saveUninitialized: false, 
    secret: "Trassssshhhhhh", 
    store: new MongoStore({
      url: "mongodbL//localhost:27017/impact-sessions"
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 *7 * 2 
    }
  }));


// --------------------- Routes

// view
app.get("/home", (req, res) => {
    res.render("index");
});

// User Route
app.use("/user", controllers.users);

// Product Route
app.use("/products", controllers.products);


// --------------------- Server Listener
app.listen(PORT, function () {
    console.log(`Server is live and listening at http://localhost:${PORT}`);
  });