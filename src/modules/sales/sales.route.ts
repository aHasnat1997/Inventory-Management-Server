import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SaleValidation } from "./sales.validation";
import { SaleController } from "./sales.controller";

const SaleRoute = Router();

SaleRoute.post('/create', validateRequest(SaleValidation.SaleSchema), SaleController.CreateSale);
SaleRoute.get('/all', SaleController.GetAllSale);

export default SaleRoute;