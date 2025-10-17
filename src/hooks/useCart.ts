import { useState, useCallback, useMemo } from "react";
import type { CartItem, CameoProduct, ProductVariation } from "../types";
import { 
  addToCart as addToCartUtil, 
  removeFromCart, 
  updateCartItemQuantity,
  calculateCartTotal 
} from "../utils/cartUtils";

/**
 * Custom hook for managing shopping cart state and operations
 */
export function useShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: CameoProduct, variation: ProductVariation) => {
    const { updatedCart, isUpdate } = addToCartUtil(cart, product, variation);
    setCart(updatedCart);
    return { isUpdate };
  }, [cart]);

  const removeItem = useCallback((index: number) => {
    setCart(removeFromCart(cart, index));
  }, [cart]);

  const updateQuantity = useCallback((index: number, quantity: number) => {
    setCart(updateCartItemQuantity(cart, index, quantity));
  }, [cart]);

  const total = useMemo(() => calculateCartTotal(cart), [cart]);

  const itemCount = useMemo(() => cart.length, [cart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return {
    cart,
    addToCart,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  };
}

/**
 * Custom hook for managing product filtering and search
 */
export function useProductFilters<T extends { category: string; name: string }>(
  products: readonly T[],
  variations?: (item: T) => Array<{ color: string }>
) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo<string[]>(() => 
    ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const filteredProducts = useMemo<readonly T[]>(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      
      if (!searchQuery) {
        return matchesCategory;
      }

      const query = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesCategorySearch = product.category.toLowerCase().includes(query);
      const matchesVariation = variations 
        ? variations(product).some(v => v.color.toLowerCase().includes(query))
        : false;

      return matchesCategory && (matchesName || matchesCategorySearch || matchesVariation);
    });
  }, [products, selectedCategory, searchQuery, variations]);

  return {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    categories,
    filteredProducts,
  };
}
