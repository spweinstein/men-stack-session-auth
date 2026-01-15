const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 40,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 40,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
