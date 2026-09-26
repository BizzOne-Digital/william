import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const BookingSubmissionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    preferredDate: { type: String, trim: true },
    preferredTime: { type: String, trim: true },
    topic: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "contacted", "scheduled", "closed", "archived"],
      default: "new",
      index: true,
    },
    ipHash: { type: String },
  },
  { timestamps: true },
);

export type IBookingSubmission = InferSchemaType<typeof BookingSubmissionSchema> & {
  _id: mongoose.Types.ObjectId;
};

const BookingSubmission: Model<IBookingSubmission> =
  mongoose.models.BookingSubmission ??
  mongoose.model<IBookingSubmission>("BookingSubmission", BookingSubmissionSchema);

export default BookingSubmission;
