const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controllers/user.controller");

// get all users
router.get("/", getAllUsers);

module.exports = router;
