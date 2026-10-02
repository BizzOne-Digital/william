import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const StoredUploadSchema = new Schema(
  {
    folder: { type: String, required: true, trim: true, index: true },
    filename: { type: String, required: true, trim: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true, min: 0 },
    data: { type: Buffer, required: true },
  },
  { timestamps: true },
);

StoredUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });

export type IStoredUpload = InferSchemaType<typeof StoredUploadSchema> & {
  _id: mongoose.Types.ObjectId;
};

const StoredUpload: Model<IStoredUpload> =
  mongoose.models.StoredUpload ??
  mongoose.model<IStoredUpload>("StoredUpload", StoredUploadSchema);

export default StoredUpload;
