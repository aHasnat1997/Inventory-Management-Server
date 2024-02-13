import { z } from "zod";

const SaleSchema = z.object({
  productId: z.string({
    required_error: "productId is required",
    invalid_type_error: "productId must be a string",
  }),
  productName: z.string({
    required_error: "productName is required",
    invalid_type_error: "productName must be a string",
  }),
  price: z.number({
    required_error: "price is required",
    invalid_type_error: "price must be a string",
  }).min(1, 'minimum value 1'),
  quantity: z.number({
    required_error: "quantity is required",
    invalid_type_error: "quantity must be a string",
  }).min(1, 'minimum value 1'),
  buyerName: z.string({
    required_error: "buyerName is required",
    invalid_type_error: "buyerName must be a string",
  })
})

export const SaleValidation = { SaleSchema };