import { SaleModel } from "../sales/sales.model";

// const SalesHistoryForSeller = async (reportType: 'weekly' | 'daily' | 'monthly' | 'yearly') => {
//   const currentDate = new Date();
//   let startDate: Date;
//   let endDate: Date;

//   switch (reportType) {
//     case 'weekly':
//       startDate = new Date(currentDate);
//       startDate.setDate(currentDate.getDate() - currentDate.getDay()); // Start of the current week (Sunday)
//       endDate = new Date(currentDate);
//       endDate.setDate(startDate.getDate() + 6); // End of the current week (Saturday)
//       break;
//     case 'daily':
//       startDate = new Date(currentDate);
//       startDate.setHours(0, 0, 0, 0); // Start of the current day (midnight)
//       endDate = new Date(currentDate);
//       endDate.setHours(23, 59, 59, 999); // End of the current day (just before midnight)
//       break;
//     case 'monthly':
//       startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Start of the current month
//       endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // End of the current month
//       break;
//     case 'yearly':
//       startDate = new Date(currentDate.getFullYear(), 0, 1); // Start of the current year
//       endDate = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999); // End of the current year
//       break;
//     default:
//       throw new Error('Invalid report type. Supported types: weekly, daily, monthly, yearly');
//   }

//   try {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const aggregationPipeline: any[] = [
//       {
//         $match: {
//           createdAt: {
//             $gte: startDate,
//             $lte: endDate
//           }
//         }
//       },
//       {
//         $group: {
//           _id: null,
//           totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } }, // Multiply price and quantity
//           totalQuantity: { $sum: "$quantity" }, // Sum of quantities
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           _id: 0,
//           totalPrice: 1,
//           totalQuantity: 1,
//           count: 1
//         }
//       }
//     ];

//     if (reportType === 'weekly') {
//       // Add another $group stage to group by day
//       aggregationPipeline.push({
//         $group: {
//           _id: { $dayOfWeek: "$createdAt" },
//           totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } }, // Multiply price and quantity
//           totalQuantity: { $sum: "$quantity" }, // Sum of quantities
//           count: { $sum: 1 }
//         }
//       });

//       // Sort by day of week
//       aggregationPipeline.push({ $sort: { "_id": 1 } });

//       // Project to rename _id to dayOfWeek
//       aggregationPipeline.push({
//         $project: {
//           _id: 0,
//           dayOfWeek: "$_id",
//           totalPrice: 1,
//           totalQuantity: 1,
//           count: 1
//         }
//       });
//     }
//     else if (reportType === 'daily') {
//       // Add another $group stage to group by hour of the day
//       aggregationPipeline.push({
//         $group: {
//           _id: { $hour: "$createdAt" },
//           totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } }, // Multiply price by quantity
//           totalSales: { $sum: 1 }
//         }
//       });

//       // Sort by hour of the day
//       aggregationPipeline.push({ $sort: { "_id": 1 } });

//       // Project to rename _id to hourOfDay
//       aggregationPipeline.push({
//         $project: {
//           _id: 0,
//           hourOfDay: "$_id",
//           totalPrice: 1,
//           totalSales: 1
//         }
//       });
//     }
//     else if (reportType === 'monthly') {
//       // Add another $group stage to group by week
//       aggregationPipeline.push({
//         $group: {
//           _id: { $week: "$createdAt" },
//           totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } }, // Multiply price and quantity
//           totalQuantity: { $sum: "$quantity" }, // Sum of quantities
//           count: { $sum: 1 }
//         }
//       });

//       // Sort by day of week
//       aggregationPipeline.push({ $sort: { "_id": 1 } });

//       // Project to rename _id to dayOfWeek
//       aggregationPipeline.push({
//         $project: {
//           _id: 0,
//           dayOfWeek: "$_id",
//           totalPrice: 1,
//           totalQuantity: 1,
//           count: 1
//         }
//       });
//     }
//     else if (reportType === 'yearly') {
//       // Add another $group stage to group by month
//       aggregationPipeline.push({
//         $group: {
//           _id: { $month: "$createdAt" },
//           totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } }, // Multiply price by quantity
//           totalSales: { $sum: 1 }
//         }
//       });

//       // Sort by month
//       aggregationPipeline.push({ $sort: { "_id": 1 } });

//       // Project to rename _id to monthOfYear
//       aggregationPipeline.push({
//         $project: {
//           _id: 0,
//           monthOfYear: "$_id",
//           totalPrice: 1,
//           totalSales: 1
//         }
//       });
//     }

//     const salesReport = await SaleModel.aggregate(aggregationPipeline);

//     return salesReport;

//   } catch (error) {
//     console.log(error);
//   }
// }

const SalesHistoryForSeller = async (reportType: 'weekly' | 'daily' | 'monthly' | 'yearly') => {
  const currentDate = new Date();
  let firstDate;
  let lastDate;

  switch (reportType) {
    case 'weekly':
      firstDate = new Date(currentDate);
      firstDate.setDate(currentDate.getDate() - currentDate.getDay()); // Start of the current week (Sunday)
      lastDate = new Date(currentDate);
      lastDate.setDate(firstDate.getDate() + 6); // End of the current week (Saturday)
      break;
    case 'daily':
      firstDate = new Date(currentDate);
      firstDate.setHours(0, 0, 0, 0); // Start of the current day (midnight)
      lastDate = new Date(currentDate);
      lastDate.setHours(23, 59, 59, 999); // End of the current day (just before midnight)
      break;
    case 'monthly':
      firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Start of the current month
      lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // End of the current month
      break;
    case 'yearly':
      firstDate = new Date(currentDate.getFullYear(), 0, 1); // Start of the current year
      lastDate = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999); // End of the current year
      break;
    default:
      throw new Error('Invalid report type. Supported types: weekly, daily, monthly, yearly');
  }

  console.log(firstDate, lastDate);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aggregationPipeline: any = [
    {
      $match: {
        createdAt: {
          $gte: firstDate,
          $lte: lastDate
        }
      }
    },
  ];

  switch (reportType) {
    case 'weekly':
      aggregationPipeline.push({
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
          totalQuantity: { $sum: "$quantity" },
          count: { $sum: 1 }
        }
      })
      break;
    case 'monthly':
      aggregationPipeline.push({
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
          totalQuantity: { $sum: "$quantity" },
          count: { $sum: 1 }
        }
      })
      break;
    case 'yearly':
      aggregationPipeline.push({
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
          totalQuantity: { $sum: "$quantity" },
          count: { $sum: 1 }
        }
      })
      break;
    case 'daily':
      aggregationPipeline.push({
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
          totalQuantity: { $sum: "$quantity" },
          count: { $sum: 1 }
        }
      })
      break;

    default:
      throw new Error('Invalid report type. Supported types: weekly, daily, monthly, yearly');
  }

  // aggregationPipeline.push({
  //   $group: {
  //     _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
  //     totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
  //     totalQuantity: { $sum: "$quantity" },
  //     count: { $sum: 1 }
  //   }
  // })

  const result = await SaleModel.aggregate(aggregationPipeline);
  return result
}

export const SalesHistory = {
  SalesHistoryForSeller
}