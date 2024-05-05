const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth.js");

const {
  createProject,
  getAllProjects,
  deleteProjectById,
  getProjectById,
} = require("../controllers/project.controller");

// create a new project
router.post("/", authenticateToken, createProject);

// get all projects
router.get("/", authenticateToken, getAllProjects);

// get project by id
router.get("/:projectId", authenticateToken, getProjectById);

// delete project by id
router.delete("/:projectId", authenticateToken, deleteProjectById);

module.exports = router;
