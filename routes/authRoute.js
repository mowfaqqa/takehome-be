const express = require("express");
const router = express.Router();
const { signUp, login } = require("../controllers/authController");

// endpoint for User A and User B to submit data
router.post("/signup", signUp);
router.post("/login", login);

module.exports = router;
