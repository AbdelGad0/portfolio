import mongoose, { Schema, model, models } from "mongoose";

export interface AuditLogDoc {
  action: string;
  entityType?: string;
  entityId?: string;
  actorUsername?: string;
  ipAddress?: string;
  userAgent?: string;
  success?: boolean;
  details?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export const AuditLogSchema = new Schema(
  {
    action: { type: String, required: true },
    entityType: { type: String, default: "" },
    entityId: { type: String, default: "" },
    actorUsername: { type: String, default: "" },
    ipAddress: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    success: { type: Boolean, default: true },
    details: { type: Schema.Types.Mixed, default: null }
  },
  { timestamps: true }
);

export const AuditLog: mongoose.Model<AuditLogDoc> =
  (models.AuditLog as mongoose.Model<AuditLogDoc>) ||
  model<AuditLogDoc>("AuditLog", AuditLogSchema);
export default AuditLog;
