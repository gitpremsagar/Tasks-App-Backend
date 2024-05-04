const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  deleteProjectById,
} = require("../controllers/project.controller");

// create a new project
router.post("/", createProject);

// get all projects
router.get("/", getAllProjects);

// delete project by id
router.delete("/:projectId", deleteProjectById);

module.exports = router;
