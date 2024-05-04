// import sequelize
const { User } = require("../configs/db.js");

const createUser = async (req, res) => {
  try {
    // create a new user
    const user = await User.create(req.body);

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

module.exports = { getAllUsers };
