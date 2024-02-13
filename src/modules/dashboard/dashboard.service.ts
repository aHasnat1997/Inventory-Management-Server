import { SaleModel } from "../sales/sales.model"

export const DashboardSalesHistory = async () => {
  const salesHistory = await SaleModel.aggregate();
  return salesHistory;
}
