import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

/**
 * validate any request json
 * @param schema validate schema
 * @returns validated schema
 */
const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body
      await schema.parseAsync(data);
      next();
    } catch (error) {
      next(error);
    }
  }
};

export default validateRequest;