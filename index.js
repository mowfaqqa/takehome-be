const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

//  DATABASE CCONNECTION
// mongoose
//   .connect("mongo link here")
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch((err) => {
//     console.error("Failed to connect to mongoDB", err);
//   });

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
