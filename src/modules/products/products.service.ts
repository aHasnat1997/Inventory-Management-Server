import mongoose from "mongoose";
import { TProduct } from "./products.interface";
import AppError from "../../errors/AppError";
import { HTTPStatusCode } from "../../utils/httpCode";
import { ProductModel } from "./products.model";
import { CategoryModel } from "../categories/categories.model";
import QueryBuilder from "../../builder/QueryBuilder";


/**
 * Create product and category into DB
 * @param payload Product Data
 * @returns Created Product Data
 */
const CreateProduct = async (payload: TProduct) => {
  const session = await mongoose.startSession();
  session.startTransaction()
  try {
    const productCreate = await ProductModel.create([payload], { session });
    if (!productCreate.length) {
      throw new AppError(HTTPStatusCode.BadRequest, 'Failed to cerate product...');
    }

    const productCategory = {
      category: productCreate[0].category,
      subCategory: productCreate[0].subCategory
    };

    const isCategoryExist = await CategoryModel.findOne({ category: productCategory.category });
    const isSubCategoryExist = isCategoryExist?.subCategories.find(item => item === productCategory.subCategory);

    if (!isCategoryExist) {
      const newCategory = await CategoryModel.create([{ category: productCreate[0].category, subCategories: productCreate[0].subCategory }], { session });
      if (!newCategory.length) {
        throw new AppError(HTTPStatusCode.BadRequest, 'Failed to cerate product...');
      }
    } else if (isCategoryExist && !isSubCategoryExist) {
      const addSubCategory = [...isCategoryExist.subCategories, productCategory.subCategory];
      const newSubCategory = await CategoryModel.findOneAndUpdate({ category: productCategory.category }, { subCategories: addSubCategory }, { session });
      if (!newSubCategory) {
        throw new AppError(HTTPStatusCode.BadRequest, 'Failed to cerate product...');
      }
    }

    await session.commitTransaction();
    await session.endSession();
    return productCreate[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error
  }
};

/**
 * Get all products form DB 
 * @returns all products
*/
const GetAllProduct = async (query: Record<string, unknown>) => {
  // const productData: TProduct[] = (await ProductModel.find()).reverse();
  const productQuery = new QueryBuilder(
    ProductModel.find(),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return { meta, result };
};

/**
 * Get single product data from DB
 * @param id product _id
 * @returns single product data
 */
const GetSingleProduct = async (id: string): Promise<TProduct | null> => {
  const result = await ProductModel.findById(id);
  return result
}

/**
 * Update product data into DB
 * @param id product _id
 * @param payload product update data
 * @returns new update data
 */
const UpdateProduct = async (id: string, payload: TProduct) => {
  const result = await ProductModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
  return result;
}

/**
 * Delete products from DB
 * @param payload products _id array
 * @returns confirmation of delete
*/
const DeleteProducts = async (payload: string[]) => {
  const needToDeleteProduct = async (id: string) => {
    await ProductModel.findByIdAndUpdate(id, { availability: 'stock-out', quantity: 0 }, { new: true })
  }
  const result = payload.forEach(item => needToDeleteProduct(item))
  return result;
}

export const ProductService = {
  CreateProduct,
  GetAllProduct,
  GetSingleProduct,
  UpdateProduct,
  DeleteProducts
};
