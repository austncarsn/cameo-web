# TypeScript Type System Documentation

## Overview

This document outlines the TypeScript type system improvements made to the Cameo WebPage application to ensure type safety, better IDE support, and improved maintainability.

## Type Definitions

### Core Types (`src/types/index.ts`)

#### Product Types

```typescript
interface ProductVariation {
  color: string;
  image: string;
  price: number;
}

interface CameoProduct {
  id: number;
  name: string;
  variations: ProductVariation[];
  category: string;
  description?: string;
}
```

#### Cart Types

```typescript
interface CartItem {
  productId: number;
  productName: string;
  variation: ProductVariation;
  quantity: number;
}
```

#### Category Types

```typescript
type ProductCategory = "Portrait" | "Floral" | "Ornamental" | "Pins";
type CategoryFilter = "All" | ProductCategory;
```

### Component Props Types

All components use explicit prop types for better type safety:

```typescript
interface ProductCardProps {
  product: CameoProduct;
  onAddToCart: (product: CameoProduct, variation: ProductVariation) => void;
}

interface CartDrawerProps {
  cart: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
}
```

## Utility Functions (`src/utils/cartUtils.ts`)

All cart operations are extracted into pure, type-safe utility functions:

- `calculateCartTotal(cart: CartItem[]): number` - Calculates total cart value
- `findCartItem(cart, productId, variationColor): number` - Finds cart item index
- `addToCart(cart, product, variation)` - Adds/updates cart items
- `removeFromCart(cart, index)` - Removes items from cart
- `updateCartItemQuantity(cart, index, quantity)` - Updates item quantities
- `getCartItemCount(cart): number` - Gets total item count

## Custom Hooks (`src/hooks/useCart.ts`)

### useShoppingCart

Encapsulates all cart-related state and operations:

```typescript
const {
  cart,
  addToCart,
  removeItem,
  updateQuantity,
  clearCart,
  total,
  itemCount,
} = useShoppingCart();
```

### useProductFilters

Manages product filtering and search with proper type constraints:

```typescript
const {
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  categories,
  filteredProducts,
} = useProductFilters(products, (p) => p.variations);
```

## TypeScript Configuration

### tsconfig.json

Strict type checking is enabled with the following key options:

- `strict: true` - All strict type checking options enabled
- `noUnusedLocals: true` - Error on unused local variables
- `noUnusedParameters: true` - Error on unused parameters
- `noFallthroughCasesInSwitch: true` - Error on switch fallthrough
- `noImplicitReturns: true` - Error on implicit returns
- `noUncheckedIndexedAccess: true` - Adds undefined to indexed access

## Benefits

1. **Type Safety**: Catch errors at compile time rather than runtime
2. **Better IDE Support**: IntelliSense and autocomplete for all types
3. **Refactoring Safety**: Rename symbols with confidence
4. **Documentation**: Types serve as inline documentation
5. **Maintainability**: Easier to understand code structure and data flow

## Best Practices

1. Always use explicit return types for functions
2. Use `readonly` for arrays that shouldn't be mutated
3. Prefer union types over enums for simple cases
4. Use `useCallback` and `useMemo` with proper dependencies
5. Validate array access with proper guards
6. Export types for reusability across the application
