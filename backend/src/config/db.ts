import mongoose from "mongoose";
import { logger } from "../utils/logger";

export const connectDB = async (uri: string): Promise<void> => {
  try {
    await mongoose.connect(uri, { dbName: "courier-tracker" });
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    throw error;
  }
};
