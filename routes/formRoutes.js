const express = require("express");
const router = express.Routes();
const { submitData } = require("../controllers/formController");

// endpoint for User A and User B to submit data
router.post("/submit", submitData);

module.exports = router;
