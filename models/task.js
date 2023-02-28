const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: String,
    },
  },
  { timestamps: true }
);

const task = mongoose.model("task", taskSchema);
module.exports = task;
