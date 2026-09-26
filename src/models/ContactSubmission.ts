import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const ContactSubmissionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "read", "archived"],
      default: "new",
      index: true,
    },
    ipHash: { type: String },
  },
  { timestamps: true },
);

export type IContactSubmission = InferSchemaType<typeof ContactSubmissionSchema> & {
  _id: mongoose.Types.ObjectId;
};

const ContactSubmission: Model<IContactSubmission> =
  mongoose.models.ContactSubmission ??
  mongoose.model<IContactSubmission>("ContactSubmission", ContactSubmissionSchema);

export default ContactSubmission;
