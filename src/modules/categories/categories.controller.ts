import { Request, Response } from "express";
import handleAsyncReq from "../../middlewares/handelAsyncReq";
import { CategoryService } from "./categories.service";
import successResponse from "../../utils/successResponse";
import { HTTPStatusCode } from "../../utils/httpCode";

/**
 * get all categories
 */
const GetCategories = handleAsyncReq(async (req: Request, res: Response): Promise<void> => {
  const result = await CategoryService.GetAllCategories();
  successResponse(res, {
    message: 'All categories retrieved...',
    doc: result
  }, HTTPStatusCode.Ok)
});

export const CategoryController = { GetCategories };