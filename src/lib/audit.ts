import { connectDB } from "@/lib/mongodb";
import AuditLog from "@/models/AuditLog";

export async function logAudit(params: {
  actorId?: string;
  actorEmail?: string;
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, unknown>;
}) {
  await connectDB();
  await AuditLog.create({
    ...params,
    details: params.details ?? {},
  });
}
