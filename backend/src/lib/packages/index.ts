import { Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { PackageModel, PackageDocument } from "../../models/package";
import { UserModel } from "../../models/user";
import { logger } from "../../utils/logger";
import {
  Package,
  PackageResponse,
  CreatePackageRequest,
  UpdatePackageRequest,
} from "../../interfaces/package.interface";
import { JwtPayload } from "../../interfaces/auth.interface";

export const createPackage = async (
  data: CreatePackageRequest,
  user: JwtPayload
): Promise<PackageResponse> => {
  try {
    if (!["DISPATCHER", "ADMIN"].includes(user.role)) {
      logger.warn(`Unauthorized package creation attempt by ${user.email}`);
      throw new Error("Unauthorized");
    }

    let assignedCourierObjectId: Types.ObjectId | undefined;
    if (data.assigned_courier_id) {
      const courier = await UserModel.findOne({
        user_id: data.assigned_courier_id,
        role: "COURIER",
      });
      if (!courier) {
        logger.warn(`Invalid courier ID: ${data.assigned_courier_id}`);
        throw new Error("Invalid courier ID");
      }
      assignedCourierObjectId = courier._id;
    }

    const creator = await UserModel.findOne({ user_id: user.user_id });
    if (!creator) {
      logger.warn(`Invalid creator ID: ${user.user_id}`);
      throw new Error("Invalid creator ID");
    }
    const creatorObjectId = creator._id;

    const packageData: Package = {
      package_id: uuidv4(),
      status: data.status,
      lat: data.lat,
      lon: data.lon,
      event_timestamp: new Date(),
      received_at: new Date(),
      note: data.note,
      eta: data.eta ? new Date(data.eta) : undefined,
      sender_address: data.sender_address,
      destination_address: data.destination_address,
      sender: data.sender,
      receiver: data.receiver,
      sender_phone: data.sender_phone,
      receiver_phone: data.receiver_phone,
      assigned_courier: assignedCourierObjectId,
      created_by: creatorObjectId,
      created_at: new Date(),
      updated_at: new Date(),
      history: [
        {
          status: data.status,
          lat: data.lat,
          lon: data.lon,
          event_timestamp: new Date(),
          note: data.note,
          updated_by: creatorObjectId,
        },
      ],
    };

    const createdPackage = await PackageModel.create(packageData);
    const populatedPackage = await PackageModel.findOne({
      package_id: createdPackage.package_id,
    })
      .populate("assigned_courier", "user_id email role created_at")
      .populate("created_by", "user_id email role created_at")
      .populate("history.updated_by", "user_id email role created_at")
      .lean();

    logger.info(
      `Package created: ${createdPackage.package_id} by ${user.email}`
    );
    return populatedPackage as PackageResponse;
  } catch (error) {
    logger.error("Error in createPackage:", error);
    throw error;
  }
};

export const getPackages = async (
  user: JwtPayload
): Promise<PackageResponse[]> => {
  try {
    let query: any = {};
    if (user.role === "COURIER") {
      const courier = await UserModel.findOne({ user_id: user.user_id });
      if (!courier) {
        logger.warn(`Invalid courier ID: ${user.user_id}`);
        throw new Error("Invalid courier ID");
      }
      query.assigned_courier = courier._id;
    }

    const packages = await PackageModel.find(query)
      .populate("assigned_courier", "user_id email role created_at")
      .populate("created_by", "user_id email role created_at")
      .populate("history.updated_by", "user_id email role created_at")
      .lean();

    return packages as PackageResponse[];
  } catch (error) {
    logger.error("Error in getPackages:", error);
    throw error;
  }
};

export const updatePackage = async (
  package_id: string,
  data: UpdatePackageRequest,
  user: JwtPayload
): Promise<PackageResponse | null> => {
  try {
    const packageDoc = await PackageModel.findOne({ package_id });
    if (!packageDoc) {
      logger.warn(`Package not found: ${package_id}`);
      return null;
    }

    if (user.role === "COURIER") {
      const courier = await UserModel.findOne({ user_id: user.user_id });
      if (
        !courier ||
        !packageDoc.assigned_courier ||
        packageDoc.assigned_courier.toString() !== courier._id.toString()
      ) {
        logger.warn(
          `Unauthorized update attempt by ${user.email} on package ${package_id}`
        );
        throw new Error("Unauthorized");
      }
      if (
        data.sender_address ||
        data.destination_address ||
        data.sender ||
        data.receiver ||
        data.sender_phone ||
        data.receiver_phone ||
        data.assigned_courier_id ||
        data.eta
      ) {
        logger.warn(`Invalid fields for Courier update by ${user.email}`);
        throw new Error("Invalid update fields for Courier");
      }
    } else if (!["DISPATCHER", "ADMIN"].includes(user.role)) {
      logger.warn(
        `Unauthorized update attempt by ${user.email} on package ${package_id}`
      );
      throw new Error("Unauthorized");
    }

    let assignedCourierObjectId: Types.ObjectId | undefined;
    if (data.assigned_courier_id) {
      const courier = await UserModel.findOne({
        user_id: data.assigned_courier_id,
        role: "COURIER",
      });
      if (!courier) {
        logger.warn(`Invalid courier ID: ${data.assigned_courier_id}`);
        throw new Error("Invalid courier ID");
      }
      assignedCourierObjectId = courier._id;
    }

    const updater = await UserModel.findOne({ user_id: user.user_id });
    if (!updater) {
      logger.warn(`Invalid updater ID: ${user.user_id}`);
      throw new Error("Invalid updater ID");
    }
    const updaterObjectId = updater._id;

    const updateFields: Partial<Package> = {};
    if (data.sender_address) updateFields.sender_address = data.sender_address;
    if (data.destination_address)
      updateFields.destination_address = data.destination_address;
    if (data.sender) updateFields.sender = data.sender;
    if (data.receiver) updateFields.receiver = data.receiver;
    if (data.sender_phone) updateFields.sender_phone = data.sender_phone;
    if (data.receiver_phone) updateFields.receiver_phone = data.receiver_phone;
    if (data.eta) updateFields.eta = new Date(data.eta);
    if (data.assigned_courier_id)
      updateFields.assigned_courier = assignedCourierObjectId;
    if (data.status) updateFields.status = data.status;
    if (data.lat !== undefined) updateFields.lat = data.lat;
    if (data.lon !== undefined) updateFields.lon = data.lon;
    if (data.note) updateFields.note = data.note;
    if (
      data.status ||
      data.lat !== undefined ||
      data.lon !== undefined ||
      data.note
    ) {
      updateFields.event_timestamp = new Date();
      packageDoc.history.push({
        status: data.status || packageDoc.status,
        lat: data.lat,
        lon: data.lon,
        event_timestamp: new Date(),
        note: data.note,
        updated_by: updaterObjectId,
      });
    }

    const updatedPackage = await PackageModel.findOneAndUpdate(
      { package_id },
      { $set: updateFields },
      { new: true }
    )
      .populate("assigned_courier", "user_id email role created_at")
      .populate("created_by", "user_id email role created_at")
      .populate("history.updated_by", "user_id email role created_at")
      .lean();

    if (!updatedPackage) {
      logger.warn(`Package not found: ${package_id}`);
      return null;
    }

    logger.info(`Package updated: ${package_id} by ${user.email}`);
    return updatedPackage as PackageResponse;
  } catch (error) {
    logger.error("Error in updatePackage:", error);
    throw error;
  }
};

export const deletePackage = async (
  package_id: string,
  user: JwtPayload
): Promise<boolean> => {
  try {
    if (!["DISPATCHER", "ADMIN"].includes(user.role)) {
      logger.warn(
        `Unauthorized delete attempt by ${user.email} on package ${package_id}`
      );
      throw new Error("Unauthorized");
    }

    const result = await PackageModel.deleteOne({ package_id });
    if (result.deletedCount === 0) {
      logger.warn(`Package not found: ${package_id}`);
      return false;
    }

    logger.info(`Package deleted: ${package_id} by ${user.email}`);
    return true;
  } catch (error) {
    logger.error("Error in deletePackage:", error);
    throw error;
  }
};
