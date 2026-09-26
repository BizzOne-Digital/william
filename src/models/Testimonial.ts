import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const TestimonialSchema = new Schema(
  {
    authorName: { type: String, required: true, trim: true },
    authorLocation: { type: String, trim: true },
    content: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5 },
    published: { type: Boolean, default: false, index: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type ITestimonial = InferSchemaType<typeof TestimonialSchema> & {
  _id: mongoose.Types.ObjectId;
};

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ??
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
