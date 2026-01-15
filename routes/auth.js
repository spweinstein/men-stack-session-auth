const { Router } = require("express");
const controllers = require("../controllers/auth.js");

const router = Router();

router.get("/register", controllers.register);

module.exports = router;
