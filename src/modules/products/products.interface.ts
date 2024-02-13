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
  availability: 'in-stock' | 'up-coming' | 'stock-out',
  specification?: object
}