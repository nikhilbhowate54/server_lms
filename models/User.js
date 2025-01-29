const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  creation_date: {
    type: String,
  },
});

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Will store the image path or URL
});

const Item = mongoose.model("Item", itemSchema);
const User = mongoose.model("User", userSchema);
module.exports = { User, Item };
