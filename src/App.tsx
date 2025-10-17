import { ShoppingCart, Search, X } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./components/ui/sheet";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { products } from "./constants/products";
import { 
  addToCart as addToCartUtil, 
  removeFromCart, 
  updateCartItemQuantity,
  calculateCartTotal 
} from "./utils/cartUtils";
import type { 
  CameoProduct, 
  ProductVariation, 
  CartItem, 
  ProductCardProps, 
  CartDrawerProps,
  CategoryFilter 
} from "./types";

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedVariation, setSelectedVariation] = useState(0);
  const currentVariation = product.variations[selectedVariation];

  if (!currentVariation) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden group border-2 border-neutral-800 hover:border-black transition-all duration-300 hover:shadow-xl relative"
      style={{ backgroundColor: "#F5F3F0" }}
    >
      {/* Image Container with Enhanced Styling */}
      <div 
        className="aspect-square overflow-hidden flex items-center justify-center p-8 relative"
        style={{ 
          backgroundColor: "#E8E6E1",
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.02) 2px, rgba(0,0,0,.02) 4px)"
        }}
      >
        <motion.img
          key={selectedVariation}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={currentVariation.image}
          alt={`${product.name} - ${currentVariation.color}`}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Refined Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Card Content */}
      <div className="p-6 border-t-2 border-neutral-800 relative min-h-[180px] flex flex-col" style={{ backgroundColor: "#FFFEF9" }}>
        {/* Typewriter-style decorative top */}
        <div className="pb-3 border-b border-dashed border-neutral-400">
          <h3 className="text-neutral-900 mb-2 uppercase tracking-wide">
            {product.name}
          </h3>
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-600 uppercase tracking-widest">
              {currentVariation.color}
            </span>
            <span className="text-base tracking-tight">
              ${currentVariation.price}.00
            </span>
          </div>
        </div>

        {/* Color Variations - Typewriter Style */}
        {product.variations.length > 1 && (
          <div className="flex gap-2 flex-wrap mt-4">
            {product.variations.map((variation, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariation(index)}
                className={`px-3 py-1.5 text-xs border-2 uppercase tracking-wider transition-all duration-200 ${
                  selectedVariation === index
                    ? "border-black bg-black text-white"
                    : "border-neutral-700 bg-transparent text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {variation.color}
              </button>
            ))}
          </div>
        )}
        
        {/* Vintage Shopping Cart Icon - Bottom Right */}
        <div className="absolute bottom-6 right-6">
          <button
            onClick={() => onAddToCart(product, currentVariation)}
            className="group/cart p-2 border-2 border-neutral-800 hover:bg-black transition-all duration-200"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-6 w-6 text-neutral-800 group-hover/cart:text-white transition-colors" strokeWidth={2} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function CartDrawer({ cart, onRemoveItem, onUpdateQuantity }: CartDrawerProps) {
  const total = calculateCartTotal(cart);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-2 text-black hover:text-neutral-600 transition-colors">
          <ShoppingCart className="h-6 w-6" />
          {cart.length > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-black text-white"
            >
              {cart.length}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-white">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col h-full">
          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-neutral-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b border-neutral-200">
                    <div className="w-20 h-20 bg-black flex items-center justify-center p-2">
                      <img
                        src={item.variation.image}
                        alt={item.productName}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm mb-1">{item.productName}</h4>
                      <p className="text-xs text-neutral-500 mb-2">{item.variation.color}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 border border-neutral-300 flex items-center justify-center hover:bg-neutral-100"
                        >
                          -
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="w-6 h-6 border border-neutral-300 flex items-center justify-center hover:bg-neutral-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm mb-2">
                        ${item.variation.price * item.quantity}
                      </p>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-xs text-neutral-500 hover:text-neutral-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-200 pt-4 mt-4">
                <div className="flex justify-between mb-4">
                  <span className="text-lg">Total</span>
                  <span className="text-lg">
                    ${total}
                  </span>
                </div>
                <Button className="w-full bg-black text-white hover:bg-neutral-800 py-6">
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Memoize categories to avoid recalculation
  const categories = useMemo<CategoryFilter[]>(() => 
    ["All", ...Array.from(new Set(products.map((p) => p.category)))] as CategoryFilter[],
    []
  );

  // Memoize filtered products for performance
  const filteredProducts = useMemo<readonly CameoProduct[]>(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.variations.some(v => v.color.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Use useCallback to memoize event handlers
  const handleAddToCart = useCallback((product: CameoProduct, variation: ProductVariation): void => {
    const { updatedCart, isUpdate } = addToCartUtil(cart, product, variation);
    setCart(updatedCart);
    toast.success(isUpdate ? "Quantity updated in cart" : "Added to cart");
  }, [cart]);

  const handleRemoveItem = useCallback((index: number): void => {
    setCart(removeFromCart(cart, index));
    toast.success("Removed from cart");
  }, [cart]);

  const handleUpdateQuantity = useCallback((index: number, quantity: number): void => {
    setCart(updateCartItemQuantity(cart, index, quantity));
  }, [cart]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFEF9" }}>
      <Toaster position="bottom-right" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-sm border-b-2 border-neutral-800" style={{ backgroundColor: "rgba(255, 254, 249, 0.95)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-black tracking-tight uppercase" style={{ letterSpacing: "0.1em" }}>
                ══ AUSTIN CARSON ══
              </h1>
              <p className="text-xs text-neutral-600 tracking-widest uppercase mt-1">
                Est. 2025
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-black hover:text-neutral-600 transition-colors"
              >
                <Search className="h-6 w-6" />
              </button>
              <CartDrawer
                cart={cart}
                onRemoveItem={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
              />
            </div>
          </div>
          
          {/* Search Bar Dropdown */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t-2 border-neutral-800 overflow-hidden"
              >
                <div className="py-4 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-2xl mx-auto relative">
                    <Input
                      type="text"
                      placeholder="SEARCH BY NAME, CATEGORY, OR COLOR..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-neutral-800 bg-white uppercase tracking-widest text-sm placeholder:text-neutral-400 focus:outline-none focus:border-black"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-100 transition-colors"
                      >
                        <X className="h-4 w-4 text-neutral-600" />
                      </button>
                    )}
                  </div>
                  {searchQuery && (
                    <p className="text-center text-xs text-neutral-600 mt-2 uppercase tracking-wider">
                      {filteredProducts.length} RESULT{filteredProducts.length !== 1 ? 'S' : ''} FOUND
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b-2 border-neutral-800" style={{ backgroundColor: "#FFFEF9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs tracking-widest uppercase mb-4 text-neutral-600"
            >
              ═══ DESIGN MOCKUP SHOWCASE ═══
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-black mb-4 uppercase tracking-wide">
              ARTISAN CAMEOS
            </h2>
            <p className="text-neutral-700 max-w-2xl mx-auto border-t border-b border-dashed border-neutral-400 py-4 mt-6">
              MOCKUP DESIGNS CREATED IN FIGMA<br/>
              OCTOBER 16, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b-2 border-neutral-800" style={{ backgroundColor: "#F5F3F0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-sm tracking-widest uppercase whitespace-nowrap transition-all border-2 ${
                  selectedCategory === category
                    ? "text-white bg-black border-black"
                    : "text-neutral-700 bg-transparent border-neutral-700 hover:bg-neutral-100"
                }`}
              >
                [ {category} ]
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-neutral-800 mt-20" style={{ backgroundColor: "#FFFEF9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-black mb-4 tracking-widest uppercase">══ AUSTIN CARSON ══</h3>
              <p className="text-neutral-700 text-sm uppercase tracking-wide">
                Preserving the art of<br/>cameo craftsmanship<br/>since 2025
              </p>
            </div>
            <div>
              <h4 className="text-black text-sm mb-4 tracking-widest uppercase">[ CONTACT ]</h4>
              <p className="text-neutral-700 text-sm">austncarsn@gmail.com</p>
            </div>
            <div>
              <h4 className="text-black text-sm mb-4 tracking-widest uppercase">[ FOLLOW ]</h4>
              <p className="text-neutral-700 text-sm tracking-wider">
                <a href="https://www.linkedin.com/in/austin-carson-4b059731a" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
          <div className="border-t-2 border-dashed border-neutral-400 mt-8 pt-8 text-center">
            <p className="text-neutral-600 text-xs tracking-widest uppercase">
              ════════════════════════════════════<br/>
              © 2025 AUSTIN CARSON<br/>
              ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
