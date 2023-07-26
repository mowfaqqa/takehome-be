const express = require("express");
const router = express.Router();
const { submitData, fetchData } = require("../controllers/formController");

// endpoint for User A and User B to submit data
router.post("/submit", submitData);

// endpoint for user C to fetch data
router.get("data", fetchData);

module.exports = router;
