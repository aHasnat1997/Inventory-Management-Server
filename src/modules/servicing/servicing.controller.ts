import { Request, Response } from "express";
import handleAsyncReq from "../../middlewares/handelAsyncReq";
import { ServicingService } from "./servicing.service";
import successResponse from "../../utils/successResponse";
import { HTTPStatusCode } from "../../utils/httpCode";

const CerateServicing = handleAsyncReq(async (req: Request, res: Response) => {
  const result = await ServicingService.CerateServicing(req.body);
  successResponse(res, {
    message: 'Servicing request send...',
    doc: result
  }, HTTPStatusCode.Created);
});

const GetAllServicing = handleAsyncReq(async (req: Request, res: Response) => {
  const result = await ServicingService.GetAllServicing();
  successResponse(res, {
    message: 'All servicing request retrieve...',
    meta: result.meta,
    doc: result.result
  }, HTTPStatusCode.Created);
});

const GetUserServicing = handleAsyncReq(async (req: Request, res: Response) => {
  const result = await ServicingService.GetUserServicing(req?.user?._id);
  successResponse(res, {
    message: 'Your servicing request retrieve...',
    meta: result.meta,
    doc: result.result
  }, HTTPStatusCode.Created);
});

export const ServicingController = {
  CerateServicing,
  GetAllServicing,
  GetUserServicing
}