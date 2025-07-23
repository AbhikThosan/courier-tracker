import mongoose, { Schema } from "mongoose";
import { User } from "../interfaces/user.interface";

const userSchema = new Schema({
  user_id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["COURIER", "DISPATCHER", "ADMIN"],
    required: true,
  },
  created_at: { type: Date, required: true, default: Date.now },
});

export const UserModel = mongoose.model<User>("User", userSchema);

export type UserDocument = User & mongoose.Document;
