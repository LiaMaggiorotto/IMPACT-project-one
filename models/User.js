const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    location: {type: String, required: true, unique: true},
    passions: { type: String, required: true },
    email: { type: String, required: true },
}, {timestamps: true });

const User = mongoose.model("User", userSchema);

module.export = User;

