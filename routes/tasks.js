const express = require("express");
const route = express.Router();
const {
  getallTasks,
  addTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controller/tasks");

route.get("/", getallTasks);

route.post("/", addTask);

route.get("/:id", getSingleTask);

route.patch("/:id", updateTask);

route.delete("/:id", deleteTask);

module.exports = route;
