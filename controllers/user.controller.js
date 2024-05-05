const dotenv = require("dotenv");
dotenv.config();

// import User model
const { User } = require("../configs/db.js");

// import jwt and bcrypt
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;
const bcrypt = require("bcrypt");
const { use } = require("../routes/user.route.js");
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

const loginUser = async (req, res) => {
  try {
    // check if user exists
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // compare the password
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // console.log("userId = ", user.dataValues.userId);

    // dataValues: {
    //   userId: 4,
    //   firstName: 'Johny',
    //   lastName: 'Doey',
    //   email: 'johny.doey@example.com',
    //   userType: 'admin',
    //   password: '$2b$10$jT8cHXv5bd5/IeEC4xVcLu7aGpaUGiIeSKXC/vtz69D0MbBVpz/fq',
    //   createdAt: 2024-05-04T10:20:10.000Z,
    //   updatedAt: 2024-05-04T10:20:10.000Z
    // },

    // generate a token
    const token = jwt.sign(
      {
        userId: user.dataValues.userId,
        email: user.dataValues.email,
        userType: user.dataValues.userType,
        firstName: user.dataValues.firstName,
        lastName: user.dataValues.lastName,
      },
      secret
    );

    // send response
    res.status(200).json({ token });
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

const sendDecodedToken = (req, res) => {
  // send decoded token
  console.log("decoded token on route handler", req.user);
  res.json(req.user);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
  sendDecodedToken,
};
