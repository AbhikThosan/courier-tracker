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

export const validateCreatePackage = [
  body("sender_address").notEmpty().withMessage("Sender address is required"),
  body("destination_address")
    .notEmpty()
    .withMessage("Destination address is required"),
  body("sender").notEmpty().withMessage("Sender name is required"),
  body("receiver").notEmpty().withMessage("Receiver name is required"),
  body("sender_phone")
    .matches(/^\+[\d\s()-]{7,20}$/)
    .withMessage(
      "Invalid sender phone number (must start with + and contain 7-20 digits, spaces, parentheses, or hyphens)"
    ),
  body("receiver_phone")
    .matches(/^\+[\d\s()-]{7,20}$/)
    .withMessage(
      "Invalid receiver phone number (must start with + and contain 7-20 digits, spaces, parentheses, or hyphens)"
    ),
  body("status")
    .isIn(["CREATED", "ASSIGNED", "IN_TRANSIT", "DELIVERED", "FAILED"])
    .withMessage("Invalid status"),
  body("lat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Invalid latitude"),
  body("lon")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Invalid longitude"),
  body("note").optional().isString().withMessage("Note must be a string"),
  body("eta").optional().isISO8601().withMessage("Invalid ETA format"),
  body("assigned_courier_id")
    .optional()
    .isUUID()
    .withMessage("Invalid courier ID format"),
];

export const validateUpdatePackage = [
  param("id").isUUID().withMessage("Invalid package ID format"),
  body("sender_address")
    .optional()
    .notEmpty()
    .withMessage("Sender address cannot be empty"),
  body("destination_address")
    .optional()
    .notEmpty()
    .withMessage("Destination address cannot be empty"),
  body("sender")
    .optional()
    .notEmpty()
    .withMessage("Sender name cannot be empty"),
  body("receiver")
    .optional()
    .notEmpty()
    .withMessage("Receiver name cannot be empty"),
  body("sender_phone")
    .optional()
    .matches(/^\+[\d\s()-]{7,20}$/)
    .withMessage(
      "Invalid sender phone number (must start with + and contain 7-20 digits, spaces, parentheses, or hyphens)"
    ),
  body("receiver_phone")
    .optional()
    .matches(/^\+[\d\s()-]{7,20}$/)
    .withMessage(
      "Invalid receiver phone number (must start with + and contain 7-20 digits, spaces, parentheses, or hyphens)"
    ),
  body("status")
    .optional()
    .isIn(["CREATED", "ASSIGNED", "IN_TRANSIT", "DELIVERED", "FAILED"])
    .withMessage("Invalid status"),
  body("lat")
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage("Invalid latitude"),
  body("lon")
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage("Invalid longitude"),
  body("note").optional().isString().withMessage("Note must be a string"),
  body("eta").optional().isISO8601().withMessage("Invalid ETA format"),
  body("assigned_courier_id")
    .optional()
    .isUUID()
    .withMessage("Invalid courier ID format"),
];

export const validateDeletePackage = [
  param("id").isUUID().withMessage("Invalid package ID format"),
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
