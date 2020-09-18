const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
    title: { type: String, required: true },
    price: { type: String, required: true },
    imageLink: { type: String, required: false },
    productLink: { type: String, required: true},
    description: { type: String, required: false},
    category: { type: String,  required: true},
  },
  {
    timestamps: true
  } 
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;