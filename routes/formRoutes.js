const express = require("express");
const router = express.Router();
const {
  submitData,
  fetchData,
  uploadImage,
} = require("../controllers/formController");
const checkEmailMiddleware = require("../middleware/checkEmailMiddleware");
// endpoint for User A and User B to submit data
router.post("/submit", submitData);

// endpoint for user C to fetch data
router.get("/data",  fetchData);
// endpoint for User C to upload an image
router.post("/upload/:dataId", uploadImage);

module.exports = router;
