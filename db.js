const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const connectionString = process.env.CONNECTION_URL;
    await mongoose.connect(connectionString);
    console.log("connected to mongo db");
  } catch (error) {
    console.error(`error connecting to mongodb ${error.message}`);
  }
};

function checkConnection() {
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from DB");
  });
}

module.exports = {
  connectDB,
  checkConnection,
};
