const User = require("../models/user.js");
const bcrypt = require("bcrypt");

const register = (req, res) => {
  res.render("auth/register.ejs");
};

const registerUser = async (req, res) => {
  console.log("Firing register user");
  const { username, password, confirmPassword } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    return res.send("User already exists");
  } else if (password !== confirmPassword) {
    return res.send("Password must match the confirmation password");
  } else {
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);
    req.body.password = hashedPassword;
    await User.create(req.body);
    return res.send("Created user!");
  }
};

module.exports = { register, registerUser };
