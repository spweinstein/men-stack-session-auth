const { Router } = require("express");
const controllers = require("../controllers/auth.js");

const router = Router();

router.get("/register", controllers.register); // Render register form
router.post("/register", controllers.registerUser); // Process post request

module.exports = router;
