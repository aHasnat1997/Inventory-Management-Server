import { Router } from "express";
import { ProductController } from "./products.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./products.validation";
import { authGuard } from "../../middlewares/authGuard";
import { TUserRole } from "../users/user.interface";

const ProductRoute = Router();

ProductRoute.post(
  '/create',
  authGuard(TUserRole.seller, TUserRole.superAdmin),
  validateRequest(ProductValidation.ProductValidationSchema),
  ProductController.CreateProduct
);
ProductRoute.get(
  '/all',
  authGuard(TUserRole.buyer, TUserRole.seller, TUserRole.superAdmin),
  ProductController.GetAllProduct
);
ProductRoute.get(
  '/:id',
  authGuard(TUserRole.buyer, TUserRole.seller, TUserRole.superAdmin),
  ProductController.GetSingleProduct
);
ProductRoute.patch(
  '/:id',
  authGuard(TUserRole.seller, TUserRole.superAdmin),
  validateRequest(ProductValidation.ProductUpdateValidationSchema),
  ProductController.UpdateSingleProduct
);
ProductRoute.put(
  '/delete',
  authGuard(TUserRole.seller, TUserRole.superAdmin),
  ProductController.DeleteProducts
);

export default ProductRoute;