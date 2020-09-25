const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    imageLink: { type: String },
    productLink: { type: String, required: true, unique: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User",  required: true}, 
    category: { type: String, required: true }
  },
  {
    timestamps: true
  } 
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;