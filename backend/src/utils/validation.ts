import { body, validationResult, param } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validateRefresh = [
  body("refresh_token").notEmpty().withMessage("Refresh token is required"),
];

export const validateRegister = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .isIn(["COURIER", "DISPATCHER", "ADMIN"])
    .withMessage("Invalid role"),
];

export const validateDeleteUser = [
  param("id").isUUID().withMessage("Invalid user ID format"),
];

export const checkValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn("Validation errors:", errors.array());
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
