import express from "express";
import { connectDB } from "./db";
import { seedAdminUser } from "./seed";
import { logger } from "../utils/logger";

export const setupServer = async (
  port: number,
  mongoUri: string
): Promise<express.Express> => {
  const app = express();

  app.use(express.json());

  await connectDB(mongoUri);

  await seedAdminUser();

  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });

  return app;
};
