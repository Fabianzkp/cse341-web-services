const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  favoriteColor: { type: String },
  birthday: { type: String },
});

const User = mongoose.model("contacts", userSchema);

module.exports = User;