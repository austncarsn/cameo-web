/**
 * Product and Cart Types
 */

export interface ProductVariation {
  color: string;
  image: string;
  price: number;
}

export interface CameoProduct {
  id: number;
  name: string;
  variations: ProductVariation[];
  category: string;
  description?: string;
}

export interface CartItem {
  productId: number;
  productName: string;
  variation: ProductVariation;
  quantity: number;
}

/**
 * Component Props Types
 */

export interface ProductCardProps {
  product: CameoProduct;
  onAddToCart: (product: CameoProduct, variation: ProductVariation) => void;
}

export interface CartDrawerProps {
  cart: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
}

/**
 * Category Types
 */

export type ProductCategory = "Portrait" | "Floral" | "Ornamental" | "Pins";
export type CategoryFilter = "All" | ProductCategory;

/**
 * Utility Types
 */

export interface ToastOptions {
  message: string;
  type: "success" | "error" | "info";
}
