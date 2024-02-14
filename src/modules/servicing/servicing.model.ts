import { Schema, Types, model } from "mongoose";
import { TServicing } from "./servicing.interface";

const ServicingSchema = new Schema<TServicing>({
  userId: { type: Types.ObjectId, required: true, ref: 'user' },
  servicingPart: { type: String, required: true },
  issueDescription: { type: String, required: true },
  preferredDate: { type: String, required: true },
  isServicingDone: { type: Boolean, default: false }
}, {
  timestamps: true
});

/**
 * remove some fields from response JSON
 * @returns resJSON
 */
ServicingSchema.methods.toJSON = function () {
  const resJSON = this.toObject();
  delete resJSON.__v;
  return resJSON;
};

ServicingSchema.pre('find', function (next) {
  this.sort({ createdAt: -1 })
  next()
});

export const ServicingModel = model<TServicing>('servicing', ServicingSchema);