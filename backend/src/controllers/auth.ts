import { Request, Response } from "express";
import { loginUser, refreshToken, registerUser } from "../lib/auth";
import { logger } from "../utils/logger";
import {
  LoginRequest,
  RefreshTokenRequest,
} from "../interfaces/auth.interface";
import { RegisterRequest } from "../interfaces/user.interface";
import { deleteUserById, getAllUsers } from "../lib/users";

export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response
): Promise<void> => {
  try {
    const result = await loginUser(req.body);
    if (!result) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    logger.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const refresh = async (
  req: Request<{}, {}, RefreshTokenRequest>,
  res: Response
): Promise<void> => {
  try {
    const result = await refreshToken(req.body);
    if (!result) {
      res.status(401).json({ error: "Invalid refresh token" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    logger.error("Refresh token error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const register = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response
): Promise<void> => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    logger.error("Registration error:", error);
    res.status(400).json({ error: error.message || "Registration failed" });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    logger.error("Get users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const result = await deleteUserById(req.params.id);
    if (!result) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error("Delete user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
