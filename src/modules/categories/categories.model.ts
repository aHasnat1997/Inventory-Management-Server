import { Schema, model } from "mongoose";
import { TCategory } from "./categories.interface";

const CategorySchema = new Schema<TCategory>({
  category: { type: String },
  subCategories: { type: [String] }
})

/**
 * remove some fields from response JSON
 * @returns resJSON
 */
CategorySchema.methods.toJSON = function () {
  const resJSON = this.toObject();
  delete resJSON.__v;
  return resJSON;
};

export const CategoryModel = model<TCategory>('category', CategorySchema);