import { Router } from "express";
import { CategoryController } from "./categories.controller";

const CategoryRoute = Router();

CategoryRoute.get('/', CategoryController.GetCategories);

export default CategoryRoute;