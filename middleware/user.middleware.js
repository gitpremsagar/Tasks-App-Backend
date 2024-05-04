// validate login form
const validateLoginForm = (req, res, next) => {
  const { email, password, confirmPassword, userType } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  if (!userType) {
    return res.status(400).json({ error: "User Roll is required" });
  }

  if (!confirmPassword) {
    return res.status(400).json({ error: "Confirm Password is required" });
  }

  //check if password is at least 6 characters
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password should be at least 6 characters" });
  }

  //   check if password matches confirm password
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  next();
};

module.exports = { validateLoginForm };
