const express = require("express");
const router = express.Router();
const {
  validateSignUpForm,
  validateLoginForm,
} = require("../middleware/user.middleware");

const {
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
} = require("../controllers/user.controller");

const authenticateToken = require("../middleware/auth.js");

// create a new user
router.post("/", validateSignUpForm, createUser);

// login user
router.post("/login", validateLoginForm, loginUser);

// get all users
router.get("/", authenticateToken, getAllUsers);

// get user by id
router.get("/:userId", authenticateToken, getUserById);

module.exports = router;
