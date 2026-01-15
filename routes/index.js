const { Router } = require("express");
const authRoutes = require("./auth.js");
const isSignedIn = require("../middleware/is-signed-in.js");

const router = Router();

// Routes
router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.use("/auth", authRoutes);

router.get("/member", isSignedIn, (req, res) => {
  res.send("Welcome to the member zone");
});

module.exports = router;
