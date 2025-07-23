import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { UserModel, UserDocument } from "../../models/user";
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  JwtPayload,
} from "../../interfaces/auth.interface";
import {
  RegisterRequest,
  RegisterResponse,
  User,
} from "../../interfaces/user.interface";
import { logger } from "../../utils/logger";

export const generateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string | number
): string => {
  if (!secret) {
    logger.error("JWT secret is not provided");
    throw new Error("JWT secret is not provided");
  }
  return jwt.sign(payload, secret, { expiresIn: expiresIn } as jwt.SignOptions);
};

export const loginUser = async (
  data: LoginRequest
): Promise<LoginResponse | null> => {
  try {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      logger.warn(`Login failed: User not found for email ${data.email}`);
      return null;
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: Invalid password for email ${data.email}`);
      return null;
    }

    const payload: JwtPayload = {
      user_id: user.user_id,
      email: user.email,
      role: user.role,
    };

    if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
      logger.error("JWT_SECRET or JWT_REFRESH_SECRET not set");
      throw new Error("JWT configuration error");
    }

    const token = generateToken(payload, process.env.JWT_SECRET, "1h");
    const refreshToken = generateToken(
      payload,
      process.env.JWT_REFRESH_SECRET,
      "7d"
    );

    return { token, refresh_token: refreshToken };
  } catch (error) {
    logger.error("Error in loginUser:", error);
    throw error;
  }
};

export const refreshToken = async (
  data: RefreshTokenRequest
): Promise<LoginResponse | null> => {
  try {
    if (!process.env.JWT_REFRESH_SECRET) {
      logger.error("JWT_REFRESH_SECRET not set");
      throw new Error("JWT configuration error");
    }

    const payload = jwt.verify(
      data.refresh_token,
      process.env.JWT_REFRESH_SECRET
    ) as JwtPayload;
    const user = await UserModel.findOne({
      user_id: payload.user_id,
      email: payload.email,
    });

    if (!user) {
      logger.warn(`Refresh token failed: User not found for ${payload.email}`);
      return null;
    }

    const newPayload: JwtPayload = {
      user_id: user.user_id,
      email: user.email,
      role: user.role,
    };

    if (!process.env.JWT_SECRET) {
      logger.error("JWT_SECRET not set");
      throw new Error("JWT configuration error");
    }

    const token = generateToken(newPayload, process.env.JWT_SECRET, "1h");
    const refreshToken = generateToken(
      newPayload,
      process.env.JWT_REFRESH_SECRET,
      "7d"
    );

    return { token, refresh_token: refreshToken };
  } catch (error) {
    logger.error("Error in refreshToken:", error);
    return null;
  }
};

export const registerUser = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const existingUser = await UserModel.findOne({ email: data.email });
    if (existingUser) {
      logger.warn(`Registration failed: Email ${data.email} already exists`);
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user: User = {
      user_id: uuidv4(),
      email: data.email,
      password: hashedPassword,
      role: data.role,
      created_at: new Date(),
    };

    const createdUser = await UserModel.create(user);
    logger.info(`User registered: ${data.email}`);

    return {
      user_id: createdUser.user_id,
      email: createdUser.email,
      role: createdUser.role,
      created_at: createdUser.created_at,
    };
  } catch (error) {
    logger.error("Error in registerUser:", error);
    throw error;
  }
};
