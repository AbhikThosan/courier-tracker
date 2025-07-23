import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../interfaces/auth.interface";
import { logger } from "../utils/logger";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    logger.warn("Missing or invalid Authorization header");
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = payload;
    next();
  } catch (error) {
    logger.error("Invalid JWT:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      logger.warn(
        `Access denied for user ${req.user?.email} with role ${req.user?.role}`
      );
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    next();
  };
};

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
