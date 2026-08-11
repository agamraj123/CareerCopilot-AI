const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    logger.success("MongoDB Connected");
    logger.info(`Database Name: ${conn.connection.name}`);
logger.info(`Host: ${conn.connection.host}`);

  } catch (error) {
    logger.success("MongoDB Connection Failed",error);
    process.exit(1);
  }
};

module.exports = connectDB;