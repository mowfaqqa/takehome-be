const asyncHandler = require("express-async-handler");
const admin = require("firebase-admin");
const generateToken = require("../utils/generateToken");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // sign in user using firebase auth
    const userRecord = await admin.auth().getUserByEmail(email);

    res.status(200).json({ userRecord });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const signUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await admin.auth().createUser({
    email,
    password,
    disabled: false,
  });
  res.status(200).json({ user });
});

module.exports = {
  signUp,
  login,
};
