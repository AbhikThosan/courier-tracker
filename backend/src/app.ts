import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import { seedAdminUser } from "./config/seed";
import authRoutes from "./routes/auth";
import { errorHandler } from "./middleware/error";
import { logger } from "./utils/logger";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(errorHandler);

const startServer = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URI) {
      logger.error("MONGODB_URI not set");
      throw new Error("MONGODB_URI not set");
    }
    await connectDB(process.env.MONGODB_URI);
    await seedAdminUser();
    logger.info("Application initialized");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
