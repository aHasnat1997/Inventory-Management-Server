import { z } from "zod";

const ServicingSchema = z.object({
  userId: z.string({
    required_error: "userId is required",
    invalid_type_error: "userId must be a string",
  }),
  servicingPart: z.string({
    required_error: "servicingPart is required",
    invalid_type_error: "servicingPart must be a string",
  }),
  issueDescription: z.string({
    required_error: "issueDescription is required",
    invalid_type_error: "issueDescription must be a string",
  }),
  preferredDate: z.string({
    required_error: "preferredDate is required",
    invalid_type_error: "preferredDate must be a string",
  }),
  isServicingDone: z.boolean({
    invalid_type_error: "isServicingDone must be a boolean",
  }).optional()
});

export const ServicingValidation = { ServicingSchema }