import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { UserModel, UserDocument } from "../models/user";
import { User } from "../interfaces/user.interface";
import { logger } from "../utils/logger";

export const seedAdminUser = async (): Promise<void> => {
  try {
    const adminEmail = "courier.tracker.admin@test.com";
    const existingAdmin = await UserModel.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("trackeradmin123", 10);
      const adminUser: User = {
        user_id: uuidv4(),
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        created_at: new Date(),
      };

      await UserModel.create(adminUser);
      logger.info("Admin user seeded successfully");
    } else {
      logger.info("Admin user already exists");
    }
  } catch (error) {
    logger.error("Error seeding admin user:", error);
    throw error;
  }
};
