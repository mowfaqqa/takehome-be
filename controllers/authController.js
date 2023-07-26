const asyncHandler = require("express-async-handler");
const admin = require("firebase-admin");

const signUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await admin.auth().createUser({
    email,
    password,
    emailVerified: false,
    disabled: false,
  });
  res.status(200).json({ user });
});

module.exports = {
  signUp,
};
