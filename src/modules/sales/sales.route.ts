import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SaleValidation } from "./sales.validation";
import { SaleController } from "./sales.controller";
import { authGuard } from "../../middlewares/authGuard";
import { TUserRole } from "../users/user.interface";

const SaleRoute = Router();

SaleRoute.post(
  '/create',
  authGuard(TUserRole.buyer),
  validateRequest(SaleValidation.SaleSchema),
  SaleController.CreateSale
);
SaleRoute.get(
  '/all',
  authGuard(TUserRole.seller, TUserRole.superAdmin),
  SaleController.GetAllSale
);

export default SaleRoute;