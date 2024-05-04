const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT || 2000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

// route handlers
const userRouteHandler = require("./routes/user.route");
const taskRouteHandler = require("./routes/task.route");

// routes
app.use("/users", userRouteHandler);
app.use("/tasks", taskRouteHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Server is running on port ${port}\nVisit http://localhost:${port}`
  );
});
