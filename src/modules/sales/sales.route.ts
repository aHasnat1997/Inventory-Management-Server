import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SaleValidation } from "./sales.validation";
import { SaleController } from "./sales.controller";
import { authGuard } from "../../middlewares/authGuard";

const SaleRoute = Router();

SaleRoute.post('/create', authGuard('buyer'), validateRequest(SaleValidation.SaleSchema), SaleController.CreateSale);
SaleRoute.get('/all', authGuard('seller'), SaleController.GetAllSale);

export default SaleRoute;