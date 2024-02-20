import { Request, Response } from "express";
import handleAsyncReq from "../../middlewares/handelAsyncReq";
import { SalesHistory } from "./dashboard.service";
import successResponse from "../../utils/successResponse";
import { HTTPStatusCode } from "../../utils/httpCode";

const ForSeller = handleAsyncReq(async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await SalesHistory.SalesHistoryForSeller(req.params.reportType as any);
  successResponse(res, {
    message: 'Sale report retrieves successfully',
    doc: result
  }, HTTPStatusCode.Ok)
});

export const SalesHistoryController = {
  ForSeller
}