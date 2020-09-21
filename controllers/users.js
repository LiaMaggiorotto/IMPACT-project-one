const express = require('express');
const router = express.Router();

const db = require("../models")

// base route is /user

//  ------------ index route


//  ------------ new user route // view route for signup/login
router.get("/login", (req, res) => {
    res.render("/user/login");
});

//  ------------ create route


//  ------------ show route


//  ------------ edit route


//  ------------ update route


//  ------------ delete route


// Export
module.exports = router;