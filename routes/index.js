const express = require("express");
const { Router } = express;

const router = Router();

// Routes
router.get("/", (req, res) => {
  res.render("index.ejs");
});

module.exports = router;
