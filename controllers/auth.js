// base route is /auth
const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");



// register form
router.get("/register", function(req, res) {
    res.render("login");
});

// login form
router.get("/login", function(req, res) {
    res.render("login");
});

// register post
router.post("/register", async function(req, res) {
    console.log("form data:", req.body);
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });
        if(foundUser) {
            return res.send({ message: "An account with this email is already registered" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        const createdUser = await db.User.create(req.body);
        req.session.currentUser = {
            username: createdUser.username,
            id: createdUser._id,
        }
        res.redirect(`/users/${createdUser._id}/edit`);
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal Server Error", err: error });
    }
});


router.post("/login", async function(req, res) {
    console.log("form data:", req.body);
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });
        if(!foundUser) {
            return res.send({ message: "Incorrect Email or Password" });
        }
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if(!match) {
            return res.send({ message: "Incorrect Email or Password" });
        }
        req.session.currentUser = {
            username: foundUser.username,
            id: foundUser._id,
        }
        res.redirect("/home")
    } catch (error) {
        res.send({ message: "Internal Server Error", err: error });
    }
})

// logout delete 
router.delete("/logout", async function(req, res) {
    await req.session.destroy();
    res.redirect("/home");
})


module.exports = router;