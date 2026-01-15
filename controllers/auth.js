const User = require("../models/user.js");

const register = (req, res) => {
  res.render("auth/register.ejs");
};

module.exports = { register };
