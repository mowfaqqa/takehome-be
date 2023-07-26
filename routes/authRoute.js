const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/authController");

// endpoint for User A and User B to submit data
router.post("/signup", signUp);

module.exports = router;
