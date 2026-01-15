const User = require("../models/user.js");
const bcrypt = require("bcrypt");

// GET "/auth/register"
const register = (req, res) => {
  res.render("auth/register.ejs");
};

// POST "/auth/register"

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
    const createdUser = await User.create({
      username: username,
      password: password,
    });
    req.session.user = {
      username: createdUser.username,
      _id: createdUser._id,
    };
    req.session.save(() => {
      res.redirect("/"); // Need to do this asynchronously now that req.session.user is being set asynchronously by MongoStore
    }); // return res.send("Created user!");
  }
};

// GET "/auth/login"
const login = (req, res) => {
  return res.render("auth/login.ejs");
};

// POST "/auth/login"
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    // Fail if username doesnt exist
    return res.send("Login failed. Please try again.");
  } else if (!bcrypt.compareSync(password, user.password)) {
    // Fail if the user's password doesn't match what's in the database
    return res.send("Login failed. Please try again.");
  } else {
    //Log in if the provided password matches the one in the database
    req.session.user = {
      username: user.username,
      _id: user._id,
    };
    req.session.save(() => {
      res.redirect("/"); // Need to do this asynchronously now that req.session.user is being set asynchronously by MongoStore
    });
    // return res.send("User should be logged in!");
  }
};

// GET "/auth/logout"
const logout = (req, res) => {
  req.session.destroy(() => res.redirect("/")); // Need to do this asynchronously now that using MongoStore
};

module.exports = { register, registerUser, login, loginUser, logout };
