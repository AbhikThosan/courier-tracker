import { UserModel } from "../../models/user";
import { logger } from "../../utils/logger";
import { UserWithoutPassword } from "../../interfaces/user.interface";
import { JwtPayload } from "../../interfaces/auth.interface";

export const getAllUsers = async (): Promise<UserWithoutPassword[]> => {
  try {
    const users = await UserModel.find().select("-password").lean();
    return users.map((user: any) => ({
      user_id: user.user_id,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    }));
  } catch (error) {
    logger.error("Error in getAllUsers:", error);
    throw error;
  }
};

export const getCouriers = async (
  user: JwtPayload
): Promise<UserWithoutPassword[]> => {
  try {
    if (!["ADMIN", "DISPATCHER"].includes(user.role)) {
      logger.warn(`Unauthorized courier list access attempt by ${user.email}`);
      throw new Error("Unauthorized");
    }
    const couriers = await UserModel.find({ role: "COURIER" })
      .select("user_id email role created_at")
      .lean();
    return couriers.map((courier: any) => ({
      user_id: courier.user_id,
      email: courier.email,
      role: courier.role,
      created_at: courier.created_at,
    }));
  } catch (error) {
    logger.error("Error in getCouriers:", error);
    throw error;
  }
};

export const deleteUserById = async (
  user_id: string
): Promise<UserWithoutPassword | null> => {
  try {
    const user = await UserModel.findOneAndDelete({ user_id }).lean();
    if (!user) {
      logger.warn(`Delete user failed: User not found for ID ${user_id}`);
      return null;
    }
    logger.info(`User deleted: ${user.email}`);
    return {
      user_id: user.user_id,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    };
  } catch (error) {
    logger.error("Error in deleteUserById:", error);
    throw error;
  }
};
