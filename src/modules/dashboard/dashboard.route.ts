import { Router } from "express";
import { SalesHistoryController } from "./dashboard.controller";

const SaleReportRoute = Router();

SaleReportRoute.get('/admin/:reportType', SalesHistoryController.ForSeller);

export default SaleReportRoute;