const { Task, User, Project } = require("../configs/db");

const createTask = async (req, res) => {
  //   taskId int(11) AI PK
  // projectName varchar(255)
  // projectId int(11)
  // taskName varchar(255)
  // taskDescription varchar(255)
  // spendTime varchar(255)
  // priority varchar(255)
  // assignedTo varchar(255)
  // status varchar(255)
  // createdBy varchar(255)
  // updatedBy varchar(255)
  // createdAt datetime
  // updatedAt datetime
  try {
    const project = await Project.findByPk(req.body.projectId);
    const user = await User.findByPk(req.body.assignedTo);
    const task = await Task.create({
      projectName: project.projectName,
      projectId: req.body.projectId,
      taskName: req.body.taskName,
      taskDescription: req.body.taskDescription,
      spendTime: req.body.spendTime,
      priority: req.body.priority,
      assignedTo: `${user.firstName} ${user.lastName}`,
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
  getTasksByProjectId,
};
