const mongoose = require("mongoose");

async function connectDb() {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);
    console.log("Database connected");
    return connection;

    // return connection.
  } catch (e) {
    console.log("Error Error Connectin", e);
    throw new Error(e);
  }
}

module.exports = connectDb;
