import { Request, Response } from "express";
import {
  createPackage,
  getPackages,
  updatePackage,
  deletePackage,
} from "../lib/packages";
import { logger } from "../utils/logger";
import {
  CreatePackageRequest,
  UpdatePackageRequest,
} from "../interfaces/package.interface";
import { JwtPayload } from "../interfaces/auth.interface";

export const createPackageController = async (
  req: Request<{}, {}, CreatePackageRequest>,
  res: Response
): Promise<void> => {
  try {
    const result = await createPackage(req.body, req.user as JwtPayload);
    res.status(201).json(result);
  } catch (error: any) {
    logger.error("Create package error:", error);
    res
      .status(400)
      .json({ error: error.message || "Failed to create package" });
  }
};

export const getPackagesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getPackages(req.user as JwtPayload);
    res.status(200).json(result);
  } catch (error) {
    logger.error("Get packages error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePackageController = async (
  req: Request<{ id: string }, {}, UpdatePackageRequest>,
  res: Response
): Promise<void> => {
  try {
    const result = await updatePackage(
      req.params.id,
      req.body,
      req.user as JwtPayload
    );
    if (!result) {
      res.status(404).json({ error: "Package not found" });
      return;
    }
    res.status(200).json(result);
  } catch (error: any) {
    logger.error("Update package error:", error);
    res
      .status(400)
      .json({ error: error.message || "Failed to update package" });
  }
};

export const deletePackageController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const result = await deletePackage(req.params.id, req.user as JwtPayload);
    if (!result) {
      res.status(404).json({ error: "Package not found" });
      return;
    }
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    logger.error("Delete package error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
