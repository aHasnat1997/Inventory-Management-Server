import { Router } from "express";
import UserRoute from "../modules/users/user.route";
import CategoryRoute from "../modules/categories/categories.route";
import ProductRoute from "../modules/products/products.route";
import SaleRoute from "../modules/sales/sales.route";
import ServicingRoute from "../modules/servicing/servicing.route";
import SaleReportRoute from "../modules/dashboard/dashboard.route";

// create route using express router
export const AllRoutes = Router();

// all modules routes array type
type TModulesRoutes = {
    path: string,
    route: Router
}
// all modules routes array
const modulesRoutes: TModulesRoutes[] = [
    {
        path: '/categories',
        route: CategoryRoute
    },
    {
        path: '/user',
        route: UserRoute
    },
    {
        path: '/product',
        route: ProductRoute
    },
    {
        path: '/sale',
        route: SaleRoute
    },
    {
        path: '/servicing',
        route: ServicingRoute
    },
    {
        path: '/sale-report',
        route: SaleReportRoute
    }
]

// make all routes
modulesRoutes.forEach(r => AllRoutes.use(r.path, r.route));