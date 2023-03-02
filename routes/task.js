var express = require("express");
var router = express.Router();
const {
  deleteTaskById,
  createTask,
  taskById,
  allTask,
  toggleTask,
  updateTask,
} = require("../controller/task");

router
  .post("/", createTask)
  .get("/:id", taskById)
  .get("/", allTask)
  .put("/:id", toggleTask)
  .put("/update/:id", updateTask)
  .delete("/:id", deleteTaskById);

module.exports = router;
