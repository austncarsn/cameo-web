import type { CartItem, CameoProduct, ProductVariation } from "../types";

/**
 * Calculates the total price of all items in the cart
 */
export function calculateCartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.variation.price * item.quantity, 0);
}

/**
 * Finds an existing cart item by product ID and variation color
 */
export function findCartItem(
  cart: CartItem[],
  productId: number,
  variationColor: string
): number {
  return cart.findIndex(
    (item) => item.productId === productId && item.variation.color === variationColor
  );
}

/**
 * Adds a product variation to the cart or updates quantity if it exists
 */
export function addToCart(
  cart: CartItem[],
  product: CameoProduct,
  variation: ProductVariation
): { updatedCart: CartItem[]; isUpdate: boolean } {
  const existingItemIndex = findCartItem(cart, product.id, variation.color);

  if (existingItemIndex >= 0) {
    const newCart = [...cart];
    const existingItem = newCart[existingItemIndex];
    if (existingItem) {
      newCart[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
    }
    return { updatedCart: newCart, isUpdate: true };
  } else {
    return {
      updatedCart: [
        ...cart,
        {
          productId: product.id,
          productName: product.name,
          variation,
          quantity: 1,
        },
      ],
      isUpdate: false,
    };
  }
}

/**
 * Removes an item from the cart by index
 */
export function removeFromCart(cart: CartItem[], index: number): CartItem[] {
  return cart.filter((_, i) => i !== index);
}

/**
 * Updates the quantity of a cart item
 */
export function updateCartItemQuantity(
  cart: CartItem[],
  index: number,
  quantity: number
): CartItem[] {
  if (index < 0 || index >= cart.length) {
    console.error(`Invalid cart index: ${index}`);
    return cart;
  }

  const newCart = [...cart];
  const item = newCart[index];
  if (item) {
    newCart[index] = {
      productId: item.productId,
      productName: item.productName,
      variation: item.variation,
      quantity: Math.max(1, quantity), // Ensure quantity is at least 1
    };
  }
  return newCart;
}

/**
 * Gets the total number of items in the cart
 */
export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
