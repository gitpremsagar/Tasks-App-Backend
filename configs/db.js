const Sequelize = require("sequelize");

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Define users model
const User = sequelize.define("users", {
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  userType: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

// Create the users table
User.sync()
  .then(() => {
    console.log("Users table created successfully");
  })
  .catch((error) => {
    console.error("Error creating users table:", error);
  });

//   create tasks table
const Task = sequelize.define("tasks", {
  taskId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  projectName: {
    type: Sequelize.STRING,
  },
  taskName: {
    type: Sequelize.STRING,
  },
  taskDescription: {
    type: Sequelize.STRING,
  },
  spendTime: {
    type: Sequelize.STRING,
  },
  priority: {
    type: Sequelize.STRING,
  },
  assignedTo: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
  },
  createdBy: {
    type: Sequelize.STRING,
  },
  updatedBy: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

// Create the tasks table
Task.sync()
  .then(() => {
    console.log("Tasks table created successfully");
  })
  .catch((error) => {
    console.error("Error creating tasks table:", error);
  });

// create projects table
const Project = sequelize.define("projects", {
  projectId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  projectName: {
    type: Sequelize.STRING,
  },
  projectDescription: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

// Create the projects table
Project.sync()
  .then(() => {
    console.log("Projects table created successfully");
  })
  .catch((error) => {
    console.error("Error creating projects table:", error);
  });

// Export the Sequelize instance and the models
module.exports = {
  sequelize,
  User,
  Task,
  Project,
};
