import "server-only";
import AuditLog from "@/models/AuditLog";

export interface AuditLogParams {
  action: string;
  entityType?: string;
  entityId?: string;
  actorUsername?: string;
  ipAddress?: string;
  userAgent?: string;
  success?: boolean;
  details?: unknown;
}

export async function logAuditEvent(params: AuditLogParams): Promise<void> {
  try {
    await AuditLog.create({
      action: params.action,
      entityType: params.entityType || "",
      entityId: params.entityId || "",
      actorUsername: params.actorUsername || "",
      ipAddress: params.ipAddress || "",
      userAgent: params.userAgent || "",
      success: params.success ?? true,
      details: params.details ?? null
    });
  } catch {
    // Never let audit logging break the main flow
  }
}
