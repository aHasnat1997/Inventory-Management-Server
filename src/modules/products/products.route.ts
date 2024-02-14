import { Router } from "express";
import { ProductController } from "./products.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./products.validation";
import { authGuard } from "../../middlewares/authGuard";

const ProductRoute = Router();

ProductRoute.post('/create', authGuard('seller'), validateRequest(ProductValidation.ProductValidationSchema), ProductController.CreateProduct);
ProductRoute.get('/all', authGuard('buyer', 'seller'), ProductController.GetAllProduct);
ProductRoute.get('/:id', authGuard('buyer', 'seller'), ProductController.GetSingleProduct);
ProductRoute.patch('/:id', authGuard('seller'), validateRequest(ProductValidation.ProductUpdateValidationSchema), ProductController.UpdateSingleProduct);
ProductRoute.put('/delete', authGuard('seller'), ProductController.DeleteProducts);

export default ProductRoute;