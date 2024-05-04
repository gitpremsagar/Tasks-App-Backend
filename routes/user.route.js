const express = require("express");
const router = express.Router();
const { validateLoginForm } = require("../middleware/user.middleware");

const {
  createUser,
  getAllUsers,
  getUserById,
} = require("../controllers/user.controller");

// create a new user
router.post("/", validateLoginForm, createUser);

// get all users
router.get("/", getAllUsers);

// get user by id
router.get("/:userId", getUserById);

module.exports = router;
