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

// create a new user
router.post("/", validateSignUpForm, createUser);

// login user
router.post("/login", validateLoginForm, loginUser);

// get all users
router.get("/", getAllUsers);

// get user by id
router.get("/:userId", getUserById);

module.exports = router;
