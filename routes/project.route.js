const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth.js");

const {
  createProject,
  getAllProjects,
  deleteProjectById,
} = require("../controllers/project.controller");

// create a new project
router.post("/", authenticateToken, createProject);

// get all projects
router.get("/", authenticateToken, getAllProjects);

// delete project by id
router.delete("/:projectId", authenticateToken, deleteProjectById);

module.exports = router;
