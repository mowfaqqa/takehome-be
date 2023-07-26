const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/authRoute");
const formRoute = require("./routes/formRoutes");

const admin = require("firebase-admin");
require("dotenv").config();
const credentials = JSON.parse(process.env.SERVICE_ACCOUNT);

// initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api", formRoute);

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
