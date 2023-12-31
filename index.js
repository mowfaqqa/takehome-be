const express = require("express");
const cors = require("cors");
const app = express();
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
  res.send(
    "Submit form : api/submit, Login : api/auth/login/, Upload Image : api/uplaod Fetch data :api/data"
  );
});

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api", formRoute);

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
