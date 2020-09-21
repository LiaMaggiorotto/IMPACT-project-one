const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
<<<<<<< HEAD
    location: {type: String, required: true, },
    passions: { type: String, required: true },
=======
    location: {type: String, required: true },
    passions: { type: String },
>>>>>>> submaster
    email: { type: String, required: true },
},
{
  timestamps: true
} 
);

const User = mongoose.model("User", userSchema);

<<<<<<< HEAD
module.exports = User;

=======
module.exports = User;
>>>>>>> submaster
