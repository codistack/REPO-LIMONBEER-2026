import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { RuletaModal } from './components/RuletaModal';
import { LimonFastDeliveryModal } from './components/LimonFastDeliveryModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';
import { AgileDocsViewer } from './components/AgileDocsViewer';
import { Footer } from './components/Footer';

import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_COUPONS } from './data/productsData';
import { Product, Category, CartItem, Coupon, Order, OrderStatus } from './types';
import { Sparkles, SlidersHorizontal, Flame, Heart, Trash2, X, Smartphone, ArrowRight } from 'lucide-react';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('limonbeer_darkmode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Device view mode: web, mobile (app frame), admin, docs
  const [deviceView, setDeviceView] = useState<'web' | 'mobile' | 'admin' | 'docs'>('web');

  // Products & Categories
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');

  // Local User State (Cart, Wishlist, Points, Orders)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('limonbeer_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('limonbeer_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [userPoints, setUserPoints] = useState<number>(() => {
    const saved = localStorage.getItem('limonbeer_points');
    return saved ? JSON.parse(saved) : 250;
  });

  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Modals
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [ruletaOpen, setRuletaOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Fetch from Express Server on Mount
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProducts(data.data);
        }
      })
      .catch(() => {});

    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setActiveOrders(data.data);
        }
      })
      .catch(() => {});
  }, []);

  // Save LocalStorage
  useEffect(() => {
    localStorage.setItem('limonbeer_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('limonbeer_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('limonbeer_points', JSON.stringify(userPoints));
  }, [userPoints]);

  useEffect(() => {
    localStorage.setItem('limonbeer_darkmode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Cart Functions
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist Functions
  const handleToggleFavorite = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Coupon
  const handleApplyCoupon = (code: string) => {
    const found = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase() && c.active);
    if (found) {
      setAppliedCoupon(found);
      alert(`¡Cupón ${found.code} aplicado con éxito! Descuento del ${found.discountPercent}%`);
    } else {
      alert('Cupón no válido o expirado.');
    }
  };

  // Order Completed
  const handleCompleteOrder = (orderData: Partial<Order>) => {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setActiveOrders((prev) => [resData.data, ...prev]);
        }
      })
      .catch(() => {});

    // Award Points
    const earnedPoints = Math.floor((orderData.total || 0) * 10);
    setUserPoints((prev) => prev + earnedPoints);

    // Clear Cart
    setCart([]);
    setAppliedCoupon(null);
  };

  // Order Status update from Admin or Demo
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    fetch(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setActiveOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status } : o))
          );
        }
      })
      .catch(() => {});
  };

  // Admin CRUD Products
  const handleAddProduct = (newP: Partial<Product>) => {
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newP)
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setProducts((prev) => [resData.data, ...prev]);
        }
      })
      .catch(() => {
        const fallback: Product = {
          ...newP as Product,
          id: `p-${Date.now()}`
        };
        setProducts((prev) => [fallback, ...prev]);
      });
  };

  const handleDeleteProduct = (id: string) => {
    fetch(`/api/products/${id}`, { method: 'DELETE' })
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      })
      .catch(() => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      });
  };

  // Share Product Link
  const handleShareProduct = (product: Product) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `¡Mira esta cerveza en LIMONBEER!: ${product.name}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(`¡Enlace copiado al portapapeles para ${product.name}!`);
    }
  };

  // Filter & Sort Products
  let filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === 'todos' ||
      p.categoryId === activeCategory ||
      p.category.toLowerCase() === activeCategory.toLowerCase();
    
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'discount') {
    filteredProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
  }

  // Render view conditionally if admin or docs selected
  if (deviceView === 'admin') {
    return (
      <AdminPanel
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={() => {}}
        onDeleteProduct={handleDeleteProduct}
        orders={activeOrders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        coupons={coupons}
        onAddCoupon={(c) => setCoupons((prev) => [...prev, c])}
        categories={categories}
        onClose={() => setDeviceView('web')}
      />
    );
  }

  if (deviceView === 'docs') {
    return <AgileDocsViewer onClose={() => setDeviceView('web')} />;
  }

  // Main UI Wrapper (handles web or mobile frame simulation)
  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-sans transition-colors duration-300 ${
      deviceView === 'mobile' ? 'p-2 sm:p-6 bg-[#050505]' : ''
    }`}>
      
      {/* Mobile Device Frame Container Simulation if deviceView === 'mobile' */}
      <div className={deviceView === 'mobile' ? 'max-w-md mx-auto border-8 border-neutral-800 rounded-[40px] shadow-2xl overflow-hidden bg-[#0a0a0a] relative min-h-[840px]' : ''}>
        
        {/* Top Navbar */}
        <Navbar
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          cartCount={cart.reduce((a, c) => a + c.quantity, 0)}
          wishlistCount={wishlist.length}
          onOpenCart={() => setCartOpen(true)}
          onOpenWishlist={() => setWishlistOpen(true)}
          onOpenRuleta={() => setRuletaOpen(true)}
          onOpenDelivery={() => setDeliveryOpen(true)}
          onOpenAdmin={() => setDeviceView('admin')}
          onOpenAgileDocs={() => setDeviceView('docs')}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          deviceView={deviceView}
          onChangeDeviceView={setDeviceView}
          userPoints={userPoints}
        />

        {/* Main Content Body */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
          
          {/* Hero Carousel */}
          <HeroCarousel
            onExploreClick={() => {
              const catalogElem = document.getElementById('catalog-section');
              catalogElem?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenRuleta={() => setRuletaOpen(true)}
          />

          {/* Quick Category Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <span>Explorar Categorías</span>
                <span className="text-[10px] bg-yellow-600/20 text-yellow-500 font-bold px-2 py-0.5 rounded border border-yellow-600/30 uppercase tracking-wider">
                  {categories.length} Secciones
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`group relative p-3 rounded-xl border text-left transition transform active:scale-95 flex flex-col justify-between h-28 overflow-hidden ${
                    activeCategory === cat.id
                      ? 'border-yellow-600 bg-yellow-600/20 shadow-lg'
                      : 'border-white/10 bg-[#0f0f0f] hover:border-yellow-600/40'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative z-10 font-bold text-xs text-white group-hover:text-yellow-500">
                    {cat.name}
                  </div>
                  <div className="relative z-10 text-[10px] text-gray-400 font-semibold">
                    {cat.itemCount} productos
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Controls (Search info & Sort dropdown) */}
          <div id="catalog-section" className="pt-4 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white">
                  {activeCategory === 'todos'
                    ? 'Todos nuestros Productos'
                    : categories.find((c) => c.id === activeCategory)?.name || 'Catálogo LimonBeer'}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Mostrando {filteredProducts.length} cervezas y licores disponibles con entrega express LimonFast ⚡.
                </p>
              </div>

              {/* Sorting Selector */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 bg-[#0f0f0f] border border-white/10 rounded-lg text-xs font-semibold text-white focus:outline-none focus:border-yellow-600"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="rating">Mejor Valorados</option>
                  <option value="discount">Mayor Descuento %</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-[#0f0f0f] rounded-2xl border border-white/10 space-y-3">
                <div className="text-4xl">🔍</div>
                <div className="text-lg font-serif font-bold text-white">No se encontraron productos</div>
                <p className="text-xs text-gray-400">Intenta buscar con otros términos o seleccionar otra categoría.</p>
                <button
                  onClick={() => {
                    setActiveCategory('todos');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded bg-red-700 text-white font-bold text-xs uppercase tracking-widest border border-yellow-600/30"
                >
                  Limpiar Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={wishlist.some((w) => w.id === product.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                    onOpenDetails={(p) => setSelectedProductModal(p)}
                    onShare={handleShareProduct}
                  />
                ))}
              </div>
            )}
          </div>

        </main>

        {/* Footer */}
        <Footer />

      </div>

      {/* MODALS */}
      
      {/* Product Specs Modal */}
      <ProductModal
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        isFavorite={selectedProductModal ? wishlist.some((w) => w.id === selectedProductModal.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={(p, qty) => {
          handleAddToCart(p, qty);
          setSelectedProductModal(null);
          setCartOpen(true);
        }}
        onShare={handleShareProduct}
      />

      {/* Ruleta Ganadora Modal */}
      <RuletaModal
        isOpen={ruletaOpen}
        onClose={() => setRuletaOpen(false)}
        userPoints={userPoints}
        onAddPoints={(pts) => setUserPoints((prev) => prev + pts)}
        onAddWonCoupon={(code) => handleApplyCoupon(code)}
      />

      {/* LimonFast Delivery Tracker Modal */}
      <LimonFastDeliveryModal
        isOpen={deliveryOpen}
        onClose={() => setDeliveryOpen(false)}
        activeOrder={activeOrders.length > 0 ? activeOrders[0] : null}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={() => setAppliedCoupon(null)}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        appliedCoupon={appliedCoupon}
        onCompleteOrder={handleCompleteOrder}
      />

      {/* Wishlist Drawer/Modal */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 font-serif font-bold text-lg">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <span>Mis Favoritos ({wishlist.length})</span>
              </div>
              <button onClick={() => setWishlistOpen(false)} className="p-1.5 rounded hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            {wishlist.length === 0 ? (
              <div className="text-center py-8 text-xs text-gray-400">
                No tienes productos en tu lista de favoritos.
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {wishlist.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 bg-white/5 border border-white/10 rounded-lg">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" referrerPolicy="no-referrer" />
                    <div className="flex-1 min-w-0 text-xs">
                      <div className="font-bold truncate">{item.name}</div>
                      <div className="text-red-500 font-mono font-bold">${item.price.toFixed(2)}</div>
                    </div>
                    <button
                      onClick={() => {
                        handleAddToCart(item, 1);
                        setWishlistOpen(false);
                        setCartOpen(true);
                      }}
                      className="px-3 py-1 rounded bg-red-700 text-white font-bold text-xs uppercase"
                    >
                      Agregar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
