import { Request, Response } from "express";
import handleAsyncReq from "../../middlewares/handelAsyncReq";
import { ProductService } from "./products.service";
import successResponse from "../../utils/successResponse";
import { HTTPStatusCode } from "../../utils/httpCode";

/**
 * Create product
 */
const CreateProduct = handleAsyncReq(async (req: Request, res: Response) => {
  const result = await ProductService.CreateProduct(req.body);
  successResponse(res, {
    message: 'Product add successfully',
    doc: result
  }, HTTPStatusCode.Created)
});

/**
 * Get all product
 */
const GetAllProduct = handleAsyncReq(async (req: Request, res: Response) => {
  const result = await ProductService.GetAllProduct(req.query);
  successResponse(res, {
    message: 'All product retrieves successfully',
    meta: result.meta,
    doc: result.result
  }, HTTPStatusCode.Ok)
});

/**
 * Get single product
 */
const GetSingleProduct = handleAsyncReq(async (req: Request, res: Response) => {
  const result = await ProductService.GetSingleProduct(req.params.id);
  successResponse(res, {
    message: 'Product retrieves successfully',
    doc: result
  }, HTTPStatusCode.Ok)
});

/**
 * Update single product
 */
const UpdateSingleProduct = handleAsyncReq(async (req: Request, res: Response) => {
  const result = await ProductService.UpdateProduct(req.params.id, req.body);
  successResponse(res, {
    message: 'Product update successfully',
    doc: result
  }, HTTPStatusCode.Ok)
});

/**
 * Delete product
 */
const DeleteProducts = handleAsyncReq(async (req: Request, res: Response) => {
  const result = await ProductService.DeleteProducts(req.body.ids);
  successResponse(res, {
    message: 'Product delete successfully',
    doc: result
  }, HTTPStatusCode.Ok)
});

export const ProductController = {
  CreateProduct,
  GetAllProduct,
  GetSingleProduct,
  UpdateSingleProduct,
  DeleteProducts
};
