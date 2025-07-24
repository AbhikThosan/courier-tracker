import { Types } from "mongoose";

export type PackageStatus =
  | "CREATED"
  | "ASSIGNED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "FAILED";

export interface Package {
  package_id: string;
  status: PackageStatus;
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
  assigned_courier?: Types.ObjectId;
  created_by: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
  history: {
    status: PackageStatus;
    lat?: number;
    lon?: number;
    event_timestamp: Date;
    note?: string;
    updated_by: Types.ObjectId;
  }[];
}

export interface CreatePackageRequest {
  sender_address: string;
  destination_address: string;
  sender: string;
  receiver: string;
  sender_phone: string;
  receiver_phone: string;
  status: PackageStatus;
  lat?: number;
  lon?: number;
  note?: string;
  eta?: Date;
  assigned_courier_id?: string;
}

export interface UpdatePackageRequest {
  sender_address?: string;
  destination_address?: string;
  sender?: string;
  receiver?: string;
  sender_phone?: string;
  receiver_phone?: string;
  status?: PackageStatus;
  lat?: number;
  lon?: number;
  note?: string;
  eta?: Date;
  assigned_courier_id?: string;
}

export interface PackageResponse {
  package_id: string;
  status: PackageStatus;
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
  assigned_courier?: {
    user_id: string;
    email: string;
    role: "COURIER";
    created_at: Date;
  };
  created_by: {
    user_id: string;
    email: string;
    role: "DISPATCHER" | "ADMIN";
    created_at: Date;
  };
  created_at: Date;
  updated_at: Date;
  history: {
    status: PackageStatus;
    lat?: number;
    lon?: number;
    event_timestamp: Date;
    note?: string;
    updated_by: {
      user_id: string;
      email: string;
      role: "COURIER" | "DISPATCHER" | "ADMIN";
      created_at: Date;
    };
  }[];
}
