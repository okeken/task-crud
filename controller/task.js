const taskDb = require("../models/task");
const {
  ReasonPhrases,
  StatusCodes,

} = require("http-status-codes");

const createTask = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(403).json({ message: "Title is required" });
  }
  try {
    const createTaskInfo = await taskDb.create({ title });
    return res.status(201).json({
      message: "task created successfully",
      data: createTaskInfo._doc,
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
  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: ReasonPhrases.BAD_REQUEST,
    });
  }
  try {
    await taskDb.findByIdAndDelete(id);
    return res.status(StatusCodes.NO_CONTENT).json({
      message: ReasonPhrases.NO_CONTENT,
    });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      error: e,
    });
  }
};

const updateTask = async (req, res) => {
  const title = req.body.title;
  const id = req.params.id;

  if (!id || !title) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "All fields are required",
    });
  }

  try {
    const updated = await taskDb.findByIdAndUpdate(id, {
      $set: {
        title,
      },
    });

    return res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: { ...updated._doc, title },
    });
  } catch (e) {}
};

module.exports = {
  createTask,
  allTask,
  taskById,
  toggleTask,
  deleteTaskById,
  updateTask,
};
