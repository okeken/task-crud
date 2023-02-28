const taskDb = require("../models/task");

const createTask = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(403).json({ message: "Title is required" });
  }
  try {
    const createTask = await taskDb.create({ title });
    return res.status(201).json({
      message: "task created successfully",
      data: createTask._doc,
    });
  } catch (e) {
    return res.status(500).json({
      error: e,
      message: "Server Error",
    });
  }
};

const allTask = async (req, res) => {
  try {
    const tasks = await taskDb.find({});
    return res
      .status(200)
      .json({ data: tasks, message: "task fetced successfully" });
  } catch (e) {
    return res.status(500).json({
      error: e,
      message: "Server Error",
    });
  }
};

const taskById = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await taskDb.findById(id);
    return res
      .status(200)
      .json({ data: task, message: "task returned successfully" });
  } catch (e) {
    return res.status(500).json({
      error: e,
      message: "Server Error",
    });
  }
};

const toggleTask = async (req, res) => {
  const id = req.params.id;

  try {
    const currentTask = await taskDb.findById(id);
    if (!currentTask._id) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await taskDb.updateOne(
      { _id: id },
      {
        $set: {
          isDone: !currentTask._doc.isDone,
        },
      }
    );

    return res.status(201).json({
      message: "task updated",
    });
  } catch (e) {
    return res.status(500).json({
      error: e,
      message: "Server Error",
    });
  }
};

const deleteTaskById = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await taskDb.findByIdAndDelete(id);
    return res
      .status(201)
      .json({ data: task, message: "task deleted successfully" });
  } catch (e) {
    return res.status(500).json({
      error: e,
      message: "Server Error",
    });
  }
};

module.exports = {
  createTask,
  allTask,
  taskById,
  toggleTask,
  deleteTaskById,
};
