const mongoose = require("mongoose");
const { connection_url } = require("../config/keys");

const connectMongodb = async () => {
  try {
    await mongoose.connect(connection_url);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection error:", error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectMongodb; // CommonJS export