const express = require("express");

const { loginUser, signupUser } = require("../controllers/userControllers");

const router = express.Router();

router.get("/login", loginUser);
router.post("/signup", signupUser)

module.exports = router;