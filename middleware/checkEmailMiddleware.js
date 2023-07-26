const checkEmailMiddleware = (req, res, next) => {
  const allowedEmail = "admin@email.com"; // Replace with the authorized email address

  const { email } = req.body;

  if (email !== allowedEmail) {
    return res.status(403).json({ error: "Unauthorized to fetch data" });
  }

  next();
};

module.exports = checkEmailMiddleware;
