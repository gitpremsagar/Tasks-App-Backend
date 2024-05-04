const dotenv = require("dotenv");
dotenv.config();

// import sequelize
const { User } = require("../configs/db.js");

// import jwt and bcrypt
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUser = async (req, res) => {
  try {
    // check if user already exists
    const existing = await User.findOne({
      where: { email: req.body.email },
    });

    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // replace the password with the hashed password
    req.body.password = hashedPassword;

    // create a new user
    const user = await User.create(req.body);

    // remove the password from the response
    user.password = undefined;

    // send response
    res.status(201).json(user);
  } catch (error) {
    // send error response
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // get all users
    const users = await User.findAll();

    // send response
    res.status(200).json(users);
  } catch (error) {
    // send error response
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    // get user by id
    const user = await User.findByPk(req.params.userId);

    // send response
    res.status(200).json(user);
  } catch (error) {
    // send error response
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, getAllUsers, getUserById };
