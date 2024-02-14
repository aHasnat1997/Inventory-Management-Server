import { ObjectId } from "mongoose";

export type TSales = {
  userId: ObjectId,
  productId: ObjectId,
  productName: string,
  price: number
  quantity: number,
  buyerName: string
}