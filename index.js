const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const formRoute = require("./routes/formRoutes");

const admin = require("firebase-admin");
const credentials = require("./takehome-569ec-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});
//  DATABASE CONNECTION
const db = admin.firestore();

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api", formRoute);

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
