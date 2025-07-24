import { Router } from "express";
import {
  createPackageController,
  getPackagesController,
  updatePackageController,
  deletePackageController,
} from "../controllers/packages";
import {
  validateCreatePackage,
  validateUpdatePackage,
  validateDeletePackage,
  checkValidation,
} from "../utils/validation";
import { verifyToken, restrictTo } from "../middleware/auth";

const router = Router();

router.post(
  "/",
  verifyToken,
  restrictTo("DISPATCHER", "ADMIN"),
  validateCreatePackage,
  checkValidation,
  createPackageController
);
router.get(
  "/",
  verifyToken,
  restrictTo("ADMIN", "DISPATCHER", "COURIER"),
  getPackagesController
);
router.put(
  "/:id",
  verifyToken,
  restrictTo("DISPATCHER", "COURIER", "ADMIN"),
  validateUpdatePackage,
  checkValidation,
  updatePackageController
);
router.delete(
  "/:id",
  verifyToken,
  restrictTo("DISPATCHER", "ADMIN"),
  validateDeletePackage,
  checkValidation,
  deletePackageController
);

export default router;
