const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
    },
    hashedPassword: {
      type: String,
    },
    username: {
      type: String,
      min: 4,
      max: 20,
    },
    tasks: [],
  },
  {
    timestamps: true,
  }
);
const user = mongoose.model("user", userSchema);

module.exports = user;
