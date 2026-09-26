import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const ProductVariantSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, trim: true },
    priceCAD: { type: Number, min: 0 },
    salePriceCAD: { type: Number, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
  },
  { _id: true },
);

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    category: { type: String, default: "General", trim: true, index: true },
    images: [{ type: String }],
    variants: [ProductVariantSchema],
    sku: { type: String, trim: true },
    priceCAD: { type: Number, required: true, min: 0 },
    salePriceCAD: { type: Number, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    featured: { type: Boolean, default: false, index: true },
    displayOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

ProductSchema.index({ title: "text", description: "text" });

export type IProduct = InferSchemaType<typeof ProductSchema> & {
  _id: mongoose.Types.ObjectId;
};

const Product: Model<IProduct> =
  mongoose.models.Product ?? mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
