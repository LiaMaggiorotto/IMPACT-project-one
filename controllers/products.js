// base route is /products
const express = require("express");
const router = express.Router();
const {authRequired} = require('./auth');

const db = require("../models");


// Cruelty Free Landing Page View Route
router.get("/crueltyfree", (req, res) => {
    res.render("products/cruelty_free/landing", { user: req.session.currentUser });
});

// Plastic Consumption Landing Page View Route
router.get("/plastic", (req, res) => {
    res.render("products/plastic_consumption/landing", { user: req.session.currentUser });
});


// Carbon Emmissions Landing Page View Route
router.get("/carbon", (req, res) => {
    res.render("products/carbon_emissions/landing", { user: req.session.currentUser });
});




// index view, product list 
router.get("/", async function (req, res) {
    try {
        const foundProducts = await db.Product.find({});
        const context = {
        products: foundProducts,
        }
        res.render("products/index", context);
        } catch (error) {
        console.log (error);
        res.send( { message: "Internal Server Error" });
        }
});





// new
router.get("/new", authRequired, function (req, res) {
    res.render("products/new", { user: req.session.currentUser });
    });



// create
router.post("/", function (req, res) {
    req.body.user = req.session.currentUser._id;
    db.Product.create(req.body, function (err, createdProduct) {
    if (err) {
        console.log(err);
        return res.send(err);
    } 
    db.User.findById(req.body.user, function (err, foundUser) {
        foundUser.products.push(createdProduct);
        foundUser.save()
        res.redirect("/user/:id");
    })
    });
});




// show
router.get("/:id", function (req, res) {
    db.Product.findById(req.params.id)
    .populate("products")
    .exec(function (err, foundProduct) {
        if (err) {
        console.log(err);
        return res.send(err);
        }
        const context = { product: foundProduct };
        res.render("product/show", context);
    });
});





// // edit <- view
// router.get("/:id/edit", function (req, res) {
//     db.Product.findById(req.params.id, function (err, foundProduct) {
//     if (err) {
//         console.log(err);
//         return res.send(err);
//     }
//     const context = { product: foundProduct };
//     res.render("product/edit", context);
//     });
// });

// // update <- db change
// router.put("/:id", function (req, res) {
//     db.Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (
//     err,
//     updatedProduct
//     ) {
//     if (err) {
//         console.log(err);
//         return res.send(err);
//     }

//     res.redirect(`/products/${updatedProduct._id}`);
//     });
// });





  // delete
// router.delete("/:id", function (req, res) {
//     db.Product.findByIdAndDelete(req.params.id, function (err, deletedProduct) {
//     if (err) {
//         console.log(err);
//         return res.send(err);
//     }

//     db.Product.remove({ author: deletedProduct._id }, function (
//         err,
//         removedProducts
//     ) {
//         if (err) {
//         console.log(err);
//         return res.send(err);
//         }
//         res.redirect("/products");
//     });
//     });
// });

module.exports = router;
