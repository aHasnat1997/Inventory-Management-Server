import { Schema, model } from "mongoose";
import { TAvailability, TProduct } from "./products.interface";

const ProductSchema = new Schema<TProduct>({
  productName: { type: String, required: true },
  productImg: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  brand: { type: String, required: true },
  compatibility: { type: [String], required: true },
  condition: { type: String, required: true },
  availability: { type: String, enum: [TAvailability.inStock, TAvailability.upComing, TAvailability.stockOut], required: true, default: TAvailability.inStock },
  specification: { type: Object }
}, {
  timestamps: true
});

/**
 * remove some fields from response JSON
 * @returns resJSON
 */
ProductSchema.methods.toJSON = function () {
  const resJSON = this.toObject();
  delete resJSON.__v;
  return resJSON;
};

ProductSchema.pre('find', function (next) {
  this.sort({ createdAt: -1 })
  next()
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteFun = function (this: any, next: any) {
  this.find({ availability: { $ne: 'stock-out' } });
  next();
}
ProductSchema.pre('find', deleteFun);
ProductSchema.pre('findOne', deleteFun);
ProductSchema.pre('findOneAndUpdate', deleteFun);

export const ProductModel = model<TProduct>('product', ProductSchema);
