const { Router } = require("express");
const authRoutes = require("./auth.js");

const router = Router();

// Routes
router.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
});

router.use("/auth", authRoutes);

module.exports = router;
