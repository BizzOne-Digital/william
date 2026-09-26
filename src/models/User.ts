import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, trim: true },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true },
);

export type IUser = InferSchemaType<typeof UserSchema> & {
  _id: mongoose.Types.ObjectId;
};

const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);

export default User;
