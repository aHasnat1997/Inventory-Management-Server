import { TCategory } from "./categories.interface";
import { CategoryModel } from "./categories.model"

/**
 * Get all category from DB
 * @returns Array of Categories
 */
const GetAllCategories = async (): Promise<TCategory[]> => {
  const result = await CategoryModel.find();
  return result
}

export const CategoryService = { GetAllCategories };