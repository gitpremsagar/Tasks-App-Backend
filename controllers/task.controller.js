const { Task, User, Project } = require("../configs/db");

const createTask = async (req, res) => {
  try {
    const project = await Project.findByPk(req.body.projectId);
    const task = await Task.create({
      projectName: project.projectName,
      projectId: req.body.projectId,
      taskName: req.body.taskName,
      taskDescription: req.body.taskDescription,
      spendTime: req.body.spendTime,
      priority: req.body.priority,
      assignedTo: req.body.assignedTo,
      status: req.body.status,
      createdBy: `${req.user.firstName} ${req.user.lastName}`,
      updatedBy: `${req.user.firstName} ${req.user.lastName}`,
    });
    // console.log("Task created successfully", task);
    res.status(201).json(task);
  } catch (error) {
    console.log("Error creating task", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.taskId);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskByUserId = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { assignedTo: req.params.userId },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasksByProjectName = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { projectName: req.params.projectName },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasksByProjectId = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { projectId: req.params.projectId },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.body.projectId);
    const task = await Task.findByPk(req.params.taskId);
    if (task) {
      task.update({
        projectName: project.projectName,
        projectId: req.body.projectId,
        taskName: req.body.taskName,
        taskDescription: req.body.taskDescription,
        spendTime: req.body.spendTime,
        priority: req.body.priority,
        assignedTo: req.body.assignedTo,
        status: req.body.status,
        createdBy: `${req.user.firstName} ${req.user.lastName}`,
        updatedBy: `${req.user.firstName} ${req.user.lastName}`,
      });
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.log("Error updating task", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.taskId);
    if (task) {
      task.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  getTaskByUserId,
  updateTaskById,
  deleteTaskById,
  getTasksByProjectName,
  getTasksByProjectId,
};
