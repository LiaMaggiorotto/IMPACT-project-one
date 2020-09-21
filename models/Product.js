const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
    title: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    imageLink: { type: String },
    productLink: { type: String, required: true, unique: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "User",  required: true}, // unsure on if this should ref: User.
  },
  {
    timestamps: true
  } 
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;