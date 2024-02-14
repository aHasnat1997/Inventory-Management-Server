import { Request, Response } from "express";
import handleAsyncReq from "../../middlewares/handelAsyncReq";
import { SaleService } from "./sales.service";
import successResponse from "../../utils/successResponse";
import { HTTPStatusCode } from "../../utils/httpCode";

const CreateSale = handleAsyncReq(async (req: Request, res: Response) => {
  const result = await SaleService.CreateSale(req.body);
  successResponse(res, {
    message: 'Sale created successfully...',
    doc: result
  }, HTTPStatusCode.Created);
});

const GetAllSale = handleAsyncReq(async (req: Request, res: Response) => {
  const result = await SaleService.GetAllSale(req.query);
  successResponse(res, {
    message: 'Sales retrieves successfully...',
    meta: result.meta,
    doc: result.result
  }, HTTPStatusCode.Ok);
});

const GetUserSale = handleAsyncReq(async (req: Request, res: Response) => {
  const result = await SaleService.GetUserOrder(req?.user?._id);
  successResponse(res, {
    message: 'User purchases retrieves successfully...',
    meta: result.meta,
    doc: result.result
  }, HTTPStatusCode.Ok);
});

export const SaleController = {
  CreateSale,
  GetAllSale,
  GetUserSale
};