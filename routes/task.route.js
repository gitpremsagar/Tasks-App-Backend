const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

const {
  createTask,
  getAllTasks,
  getTaskById,
  getTaskByUserId,
  updateTaskById,
  deleteTaskById,
  getTasksByProjectName,
} = require("../controllers/task.controller");

// create a new task
router.post("/", createTask);

// get all tasks
router.get("/", authenticateToken, getAllTasks);

// get task by id
router.get("/:taskId", getTaskById);

// get tasks by user id
router.get("/user/:userId", getTaskByUserId);

// get tasks by project name
router.get("/project/:projectName", getTasksByProjectName);

// update task by id
router.put("/:taskId", updateTaskById);

// delete task by id
router.delete("/:taskId", deleteTaskById);

module.exports = router;
