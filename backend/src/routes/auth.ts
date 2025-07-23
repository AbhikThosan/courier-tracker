import { Router } from "express";
import {
  login,
  refresh,
  register,
  getUsers,
  deleteUser,
} from "../controllers/auth";
import {
  validateLogin,
  validateRefresh,
  validateRegister,
  validateDeleteUser,
  checkValidation,
} from "../utils/validation";
import { verifyToken, restrictTo } from "../middleware/auth";

const router = Router();

router.post("/login", validateLogin, checkValidation, login);
router.post("/refresh", validateRefresh, checkValidation, refresh);
router.post(
  "/register",
  verifyToken,
  restrictTo("ADMIN"),
  validateRegister,
  checkValidation,
  register
);

router.get("/users", verifyToken, restrictTo("ADMIN"), getUsers);
router.delete(
  "/users/:id",
  verifyToken,
  restrictTo("ADMIN"),
  validateDeleteUser,
  checkValidation,
  deleteUser
);

export default router;
