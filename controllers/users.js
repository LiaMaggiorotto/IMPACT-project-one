// base route is /user
const express = require("express");
const router = express.Router();

const db = require("../models");


// index view
// router.get("/", async function (req, res) {
//     try {
//         const foundUsers = await db.User.find({});
//         const context = {
//         Users: foundUsers,
//         }
//         res.render("user/index", context);
//         } catch (error) {
//         console.log (error);
//         res.send( { message: "Internal Server Error" });
//         }
// });

// new, this is to view register/login page
router.get("/new", function (req, res) {
    res.render("users/login");
    });

// create
router.post("/", function (req, res) {
    db.User.create(req.body, function (err, createdUser) {
    if (err) {
        console.log(err);
        return res.send(err);
    } 
    res.redirect("/users");
    });
});

// show, individual user profile page
router.get("/:id", function (req, res) {
    db.User.findById(req.params.id)
    .populate("users")
    .exec(function (err, foundUser) {
        if (err) {
        console.log(err);
        return res.send(err);
        }
        const context = { user: foundUser };
        res.render("user/show", context);
    });
});

// edit <- view, edit individual user profile page
router.get("/:id/edit", function (req, res) {
    db.User.findById(req.params.id, function (err, foundUser) {
    if (err) {
        console.log(err);
        return res.send(err);
    }
    const context = { user: foundUser };
    res.render("user/edit", context);
    });
});

// update <- db change
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

  // delete
router.delete("/:id", function (req, res) {
    db.User.findByIdAndDelete(req.params.id, function (err, deletedUser) {
    if (err) {
        console.log(err);
        return res.send(err);
    }

    db.User.remove({ author: deletedUser._id }, function (
        err,
        removedUsers
    ) {
        if (err) {
        console.log(err);
        return res.send(err);
        }
        res.redirect("/users");
    });
    });
});

module.exports = router;
