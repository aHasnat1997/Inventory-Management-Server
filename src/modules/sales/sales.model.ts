import { Schema, Types, model } from "mongoose";
import { TSales } from "./sales.interface";

const SaleSchema = new Schema<TSales>({
  productId: { type: Types.ObjectId, required: true, ref: 'products' },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  buyerName: { type: String, required: true },
}, {
  timestamps: true
})

/**
 * remove some fields from response JSON
 * @returns resJSON
 */
SaleSchema.methods.toJSON = function () {
  const resJSON = this.toObject();
  delete resJSON.__v;
  return resJSON;
};

SaleSchema.pre('find', function (next) {
  this.sort({ createdAt: -1 })
  next()
});

export const SaleModel = model<TSales>('sale', SaleSchema);