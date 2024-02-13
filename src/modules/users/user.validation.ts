import { z } from "zod";

const UserRegistrationValidationSchema = z.object({
  username: z.object({
    firstName: z.string({
      required_error: "firstName is required",
      invalid_type_error: "firstName must be a string",
    }),
    lastName: z.string({
      required_error: "lastName is required",
      invalid_type_error: "lastName must be a string",
    })
  }),
  email: z.string({
    required_error: "email is required"
  }).email({
    message: "not a valid email"
  }),
  phone: z.string({
    required_error: "phone is required",
    invalid_type_error: "phone must be a string",
  }),
  password: z.string({
    required_error: "password is required",
    invalid_type_error: "password must be a string",
  }).min(8, 'password minimum 8 characters needed!'),
  userImg: z.string({
    invalid_type_error: "userImg must be a string",
  }).optional(),
  isActive: z.boolean({
    invalid_type_error: "isActive must be a boolean"
  }).optional()
});

const UserLoginValidationSchema = z.object({
  email: z.string({
    required_error: "email is required"
  }).email({
    message: "not a valid email"
  }),
  password: z.string({
    required_error: "password is required",
    invalid_type_error: "password must be a string",
  }).min(8, 'password minimum 8 characters needed!'),
})


export const UserValidation = {
  UserRegistrationValidationSchema,
  UserLoginValidationSchema
} 