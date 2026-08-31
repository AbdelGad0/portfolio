import mongoose, { Schema, model, models } from "mongoose";

export interface AdminCredentialDoc {
  username?: string;
  passwordHash?: string;
  mustChangePassword?: boolean;
  failedLoginAttempts?: number;
  lastFailedLoginAt?: Date | null;
  lockUntil?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export const AdminCredentialSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    mustChangePassword: { type: Boolean, default: false },
    failedLoginAttempts: { type: Number, default: 0 },
    lastFailedLoginAt: { type: Date, default: null },
    lockUntil: { type: Date, default: null }
  },
  { timestamps: true }
);

export const AdminCredential: mongoose.Model<AdminCredentialDoc> =
  (models.AdminCredential as mongoose.Model<AdminCredentialDoc>) ||
  model<AdminCredentialDoc>("AdminCredential", AdminCredentialSchema);
export default AdminCredential;
