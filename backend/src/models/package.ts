import mongoose, { Schema, Document } from "mongoose";
import { User } from "../interfaces/user.interface";

export interface PackageDocument extends Document {
  package_id: string;
  status: "CREATED" | "ASSIGNED" | "IN_TRANSIT" | "DELIVERED" | "FAILED";
  lat?: number;
  lon?: number;
  event_timestamp?: Date;
  received_at: Date;
  note?: string;
  eta?: Date;
  sender_address: string;
  destination_address: string;
  sender: string;
  receiver: string;
  sender_phone: string;
  receiver_phone: string;
  assigned_courier?: mongoose.Types.ObjectId | User;
  created_by: mongoose.Types.ObjectId | User;
  created_at: Date;
  updated_at: Date;
  history: {
    status: "CREATED" | "ASSIGNED" | "IN_TRANSIT" | "DELIVERED" | "FAILED";
    lat?: number;
    lon?: number;
    event_timestamp: Date;
    note?: string;
    updated_by: mongoose.Types.ObjectId | User;
  }[];
}

const PackageSchema = new Schema<PackageDocument>(
  {
    package_id: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["CREATED", "ASSIGNED", "IN_TRANSIT", "DELIVERED", "FAILED"],
      required: true,
    },
    lat: { type: Number },
    lon: { type: Number },
    event_timestamp: { type: Date },
    received_at: { type: Date, required: true },
    note: { type: String },
    eta: { type: Date },
    sender_address: { type: String, required: true },
    destination_address: { type: String, required: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    sender_phone: { type: String, required: true },
    receiver_phone: { type: String, required: true },
    assigned_courier: { type: Schema.Types.ObjectId, ref: "User" },
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    history: [
      {
        status: {
          type: String,
          enum: ["CREATED", "ASSIGNED", "IN_TRANSIT", "DELIVERED", "FAILED"],
          required: true,
        },
        lat: { type: Number },
        lon: { type: Number },
        event_timestamp: { type: Date, required: true },
        note: { type: String },
        updated_by: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const PackageModel = mongoose.model<PackageDocument>(
  "Package",
  PackageSchema
);
