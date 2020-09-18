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


// --------------------- Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


// --------------------- Routes



// --------------------- Server Listener
app.listen(PORT, function () {
    console.log(`Server is live and listening at http://localhost:${PORT}`);
  });