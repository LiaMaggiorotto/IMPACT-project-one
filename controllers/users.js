// base route is /user
const express = require("express");
const router = express.Router();

const db = require("../models");
const {isCorrectUser} = require('./auth');

// view register/login page
router.get("/login", function (req, res) {
    res.render("/auth/login", { user: req.session.currentUser });
    });


// show, individual user profile page
router.get("/:id", isCorrectUser, async function (req, res) {
    try {
        //https://stackoverflow.com/questions/46457071/using-mongoose-promises-with-async-await#answer-46457247
         const user = await db.User.findById(req.params.id)
        .populate("products")
        .exec();
        console.log(user);
            res.render("users/profile", {user: user, foundUser: user});
    } catch (error) {
        return res.json(error);
    }
});

// edit <- view, edit individual user profile page
router.get("/:id/edit", isCorrectUser, async function (req, res) {
    const user = await db.User.findById(req.params.id).exec();
    res.render("users/edit", { user: user, foundUser: user });
    
});

// update <- db change to user profile
router.put("/:id", function (req, res) {
    db.User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (
    err,
    updatedUser
    ) {
    if (err) {
        console.log(err);
        return res.send(err);
    }
    res.redirect(`/users/${updatedUser._id}`);
    });
});

  // delete <- delete profile route
router.delete("/:id", async function (req, res) {
    try {
        await db.User.findByIdAndDelete(req.params.id, function (err, deletedUser) {
    });
    req.session.destroy(()=> res.redirect('/'));
        
    } catch (error) {
        
    }
});

module.exports = router;
