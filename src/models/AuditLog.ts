import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const AuditLogSchema = new Schema(
  {
    actorId: { type: String },
    actorEmail: { type: String },
    action: { type: String, required: true },
    entityType: { type: String, required: true },
    entityId: { type: String },
    details: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

export type IAuditLog = InferSchemaType<typeof AuditLogSchema> & {
  _id: mongoose.Types.ObjectId;
};

const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog ?? mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);

export default AuditLog;
