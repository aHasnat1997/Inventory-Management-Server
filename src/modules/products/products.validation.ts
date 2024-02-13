import { z } from "zod";

const ProductValidationSchema = z.object({
  productName: z.string({
    required_error: "productName is required",
    invalid_type_error: "productName must be a string",
  }),
  productImg: z.string({
    invalid_type_error: "productImg must be a string",
  }).optional(),
  price: z.number({
    required_error: "price is required",
    invalid_type_error: "price must be a number",
  }),
  quantity: z.number({
    required_error: "quantity is required",
    invalid_type_error: "quantity must be a number",
  }).min(1, 'minimum value 1'),
  category: z.string({
    required_error: "category is required",
    invalid_type_error: "category must be a string",
  }),
  subCategory: z.string({
    required_error: "subCategory is required",
    invalid_type_error: "subCategory must be a string",
  }),
  brand: z.string({
    required_error: "brand is required",
    invalid_type_error: "brand must be a string",
  }),
  compatibility: z.array(z.string({
    required_error: "compatibility is required",
    invalid_type_error: "compatibility must be a string",
  })),
  condition: z.string({
    required_error: "condition is required",
    invalid_type_error: "condition must be a string",
  }),
  availability: z.string({
    required_error: "availability is required",
    invalid_type_error: "availability must be a string",
  }),
  specification: z.object({}).optional(),
});

const ProductUpdateValidationSchema = ProductValidationSchema.partial();

const ProductDeleteValidationSchema = z.array(z.string({
  required_error: "Delete id array is required",
  invalid_type_error: "Must be a string",
}));

export const ProductValidation = {
  ProductValidationSchema,
  ProductUpdateValidationSchema,
  ProductDeleteValidationSchema
};
