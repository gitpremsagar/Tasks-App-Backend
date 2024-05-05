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
  getTasksByProjectId,
} = require("../controllers/task.controller");

// create a new task
router.post("/", createTask);

// get all tasks
router.get("/", authenticateToken, getAllTasks);

// get task by id
router.get("/:taskId", authenticateToken, getTaskById);

// get tasks by user id
router.get("/user/:userId", authenticateToken, getTaskByUserId);

// get tasks by project name
router.get("/project/:projectName", authenticateToken, getTasksByProjectName);

// get tasks by project id
router.get("/project/:projectId", authenticateToken, getTasksByProjectId);

// update task by id
router.put("/:taskId", authenticateToken, updateTaskById);

// delete task by id
router.delete("/:taskId", authenticateToken, deleteTaskById);

module.exports = router;
