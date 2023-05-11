const express = require("express");

const { errorHandler } = require("../utils/errorHandler");
const { loginUser, signupUser } = require("../controllers/userControllers");

const router = express.Router();

router.get("/login", errorHandler(loginUser));
router.post("/signup", errorHandler(signupUser));

module.exports = router;