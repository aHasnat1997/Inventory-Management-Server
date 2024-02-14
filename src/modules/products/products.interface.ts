export enum TAvailability {
  inStock = 'in-stock',
  upComing = 'up-coming',
  stockOut = 'stock-out'
}

export type TProduct = {
  productName: string,
  productImg?: string,
  price: number,
  quantity: number,
  category: string,
  subCategory: string,
  brand: string,
  compatibility: [string],
  condition: 'new' | 'used',
  availability: TAvailability.inStock | TAvailability.upComing | TAvailability.stockOut,
  specification?: object
}