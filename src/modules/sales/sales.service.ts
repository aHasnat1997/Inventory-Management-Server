import mongoose from "mongoose";
import { TSales } from "./sales.interface";
import { SaleModel } from "./sales.model";
import { ProductModel } from "../products/products.model";
import { HTTPStatusCode } from "../../utils/httpCode";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";

/**
 * Create sale in DB
 * @param payload sale data
 * @returns create sale
 */
const CreateSale = async (payload: TSales) => {

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const saleProduct = await ProductModel.findById(payload.productId).session(session);
    if (!saleProduct) {
      throw new AppError(HTTPStatusCode.BadRequest, 'Product not found...');
    }
    if (saleProduct.quantity === 0) {
      throw new AppError(HTTPStatusCode.BadRequest, 'Product out of stock...');
    }
    if (saleProduct.quantity < payload.quantity) {
      throw new AppError(HTTPStatusCode.BadRequest, `There are ${saleProduct.quantity} product left`);
    }

    const result = await SaleModel.create([payload], { session });
    if (!result.length) {
      throw new AppError(HTTPStatusCode.BadRequest, 'Failed to sale product...');
    }

    const newQuantity = saleProduct.quantity - payload.quantity;

    const updateQuantity = await ProductModel.findByIdAndUpdate(payload.productId, { quantity: newQuantity }, { session });
    if (!updateQuantity) {
      throw new AppError(HTTPStatusCode.BadRequest, 'Failed to sale product...');
    }
    if (newQuantity === 0) {
      await ProductModel.findByIdAndUpdate(payload.productId, { availability: 'stock-out' }, { session });
    }

    await session.commitTransaction();
    await session.endSession();
    return result;

  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error
  }
};

/**
 * Get all sales from DB
 * @returns all sale
 */
const GetAllSale = async (query: Record<string, unknown>) => {
  const saleQuery = new QueryBuilder(
    SaleModel.find(),
    query
  ).filter()
    .sort()
    .paginate()
    .fields();
  const result = await saleQuery.modelQuery;
  const meta = await saleQuery.countTotal();
  return { meta, result };
};

export const SaleService = {
  CreateSale,
  GetAllSale
};
