/** Units on hand at or below this count show as low stock in admin. */
export const LOW_STOCK_THRESHOLD = 10;

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) return "out_of_stock";
  if (stock <= LOW_STOCK_THRESHOLD) return "low_stock";
  return "in_stock";
}

export function stockStatusLabel(status: StockStatus): string {
  switch (status) {
    case "out_of_stock":
      return "Out of stock";
    case "low_stock":
      return "Low stock";
    default:
      return "In stock";
  }
}
