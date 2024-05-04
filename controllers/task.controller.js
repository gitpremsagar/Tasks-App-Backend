const { Task } = require("../configs/db");

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
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

const updateTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.taskId);
    if (task) {
      task.update(req.body);
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
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
};
