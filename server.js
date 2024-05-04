const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT || 6000;

// route handlers
const userRouteHandler = require("./routes/user.route");

// routes
app.use("/users", userRouteHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Server is running on port ${port}\nVisit http://localhost:${port}`
  );
});
