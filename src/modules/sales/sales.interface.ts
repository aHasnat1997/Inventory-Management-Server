import { ObjectId } from "mongoose";

export type TSales = {
  productId: ObjectId,
  productName: string,
  price: number
  quantity: number,
  buyerName: string
}