import { Router } from "express";
import { authGuard } from "../../middlewares/authGuard";
import { TUserRole } from "../users/user.interface";
import validateRequest from "../../middlewares/validateRequest";
import { ServicingValidation } from "./servicing.validation";
import { ServicingController } from "./servicing.controller";

const ServicingRoute = Router();

ServicingRoute.post(
  '/create',
  authGuard(TUserRole.buyer),
  validateRequest(ServicingValidation.ServicingSchema),
  ServicingController.CerateServicing
);

ServicingRoute.get(
  '/all',
  authGuard(TUserRole.seller, TUserRole.superAdmin),
  ServicingController.GetAllServicing
);

ServicingRoute.get(
  '/my-servicing',
  authGuard(TUserRole.buyer),
  ServicingController.GetUserServicing
);

export default ServicingRoute;