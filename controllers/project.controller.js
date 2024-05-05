// {
//     createProject,
//     getAllProjects,
//     getProjectById,
//     updateProjectById,
//     deleteProjectById,
//   }

const { Project } = require("../configs/db.js");

// create a new project
const createProject = async (req, res) => {
  const { projectName, projectDescription } = req.body;
  try {
    const newProject = await Project.create({
      projectName,
      projectDescription,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get project by id
const getProjectById = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update project by id

// delete project by id
const deleteProjectById = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    await project.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  deleteProjectById,
  getProjectById,
};
