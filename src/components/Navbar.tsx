import React, { useState } from 'react';
import { 
  Beer, 
  Search, 
  ShoppingBag, 
  Heart, 
  Sparkles, 
  Truck, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  SlidersHorizontal, 
  FileText, 
  ShieldCheck, 
  Flame, 
  ChevronDown,
  Smartphone,
  Monitor
} from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenRuleta: () => void;
  onOpenDelivery: () => void;
  onOpenAdmin: () => void;
  onOpenAgileDocs: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  deviceView: 'web' | 'mobile' | 'admin' | 'docs';
  onChangeDeviceView: (view: 'web' | 'mobile' | 'admin' | 'docs') => void;
  userPoints: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenRuleta,
  onOpenDelivery,
  onOpenAdmin,
  onOpenAgileDocs,
  darkMode,
  onToggleDarkMode,
  deviceView,
  onChangeDeviceView,
  userPoints
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0a0a0a]/90 dark:bg-[#0a0a0a]/95 border-b border-white/10 transition-colors duration-300">
      {/* Top Banner - Promos & View Switcher */}
      <div className="bg-gradient-to-r from-red-950 via-[#0a0a0a] to-[#0a0a0a] text-white text-xs py-1.5 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 bg-red-700 text-yellow-500 font-bold px-2.5 py-0.5 rounded border border-yellow-600/30 text-[10px] tracking-wider uppercase animate-pulse">
              <Flame className="w-3 h-3 text-yellow-500" /> PROMO EXCLUSIVA 2026
            </span>
            <span className="text-gray-300 truncate text-[11px]">
              Envío GRATIS en Cuenca por compras mayores a $25 • Entrega Express LimonFast ⚡
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {/* View Selectors */}
            <div className="flex items-center bg-white/5 rounded-lg p-0.5 border border-white/10">
              <button
                onClick={() => onChangeDeviceView('web')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] uppercase tracking-wider font-semibold transition ${
                  deviceView === 'web' 
                    ? 'bg-red-700 text-white font-bold border border-yellow-600/40 shadow' 
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Vista Web Desktop"
              >
                <Monitor className="w-3.5 h-3.5" /> Web
              </button>
              <button
                onClick={() => onChangeDeviceView('mobile')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] uppercase tracking-wider font-semibold transition ${
                  deviceView === 'mobile' 
                    ? 'bg-red-700 text-white font-bold border border-yellow-600/40 shadow' 
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Vista Simulación App Móvil (Android/iOS)"
              >
                <Smartphone className="w-3.5 h-3.5" /> Móvil
              </button>
              <button
                onClick={onOpenAdmin}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] uppercase tracking-wider font-semibold transition ${
                  deviceView === 'admin' 
                    ? 'bg-red-700 text-white font-bold border border-yellow-600/40 shadow' 
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Panel Administrativo"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-yellow-500" /> Admin
              </button>
              <button
                onClick={onOpenAgileDocs}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] uppercase tracking-wider font-semibold transition ${
                  deviceView === 'docs' 
                    ? 'bg-red-700 text-white font-bold border border-yellow-600/40 shadow' 
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Documentación Técnica Scrum"
              >
                <FileText className="w-3.5 h-3.5 text-yellow-500" /> Doc Ágil
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo - Professional Polish Style */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                onSelectCategory('todos');
                onChangeDeviceView('web');
              }}
              className="group flex items-center gap-3 text-left focus:outline-none"
            >
              <div className="w-10 h-10 bg-red-700 flex items-center justify-center rounded-sm border-2 border-yellow-600 shadow-lg group-hover:scale-105 transition-transform">
                <span className="font-serif text-2xl font-bold text-yellow-500">L</span>
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold tracking-tighter text-white">
                  LIMON<span className="text-red-600">BEER</span>
                </h1>
                <span className="block text-[9px] font-bold text-yellow-600 -mt-1 tracking-widest uppercase">
                  Craft & Spirits House
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar - Desktop pill style matching design */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full flex items-center bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-yellow-600/40 focus-within:border-yellow-600 transition">
              <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Buscar cervezas artesanales, whisky, vinos o combos..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-xs text-gray-400 hover:text-white ml-2"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ruleta Button */}
            <button
              onClick={onOpenRuleta}
              className="relative hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-yellow-600/20 border border-yellow-400/30 transition transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-black animate-spin" style={{ animationDuration: '4s' }} />
              <span>Ruleta</span>
              <span className="bg-black text-yellow-400 text-[10px] px-1.5 py-0.5 rounded font-mono ml-0.5">
                {userPoints} pts
              </span>
            </button>

            {/* Delivery LimonFast Tracker Button */}
            <button
              onClick={onOpenDelivery}
              className="relative p-2.5 rounded bg-white/5 border border-white/10 hover:border-red-600 text-gray-300 hover:text-white transition"
              title="LimonFast Delivery Tracker"
            >
              <Truck className="w-5 h-5 text-red-500" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded bg-white/5 border border-white/10 hover:border-yellow-600/40 text-gray-300 hover:text-white transition"
              title="Lista de Favoritos"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-yellow-600/40">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest border border-yellow-600/30 transition shadow-lg"
            >
              <ShoppingBag className="w-4 h-4 text-yellow-500" />
              <span className="hidden sm:inline">Carrito</span>
              <span className="bg-black text-yellow-400 text-xs px-2 py-0.5 rounded font-mono font-bold">
                {cartCount}
              </span>
            </button>

            {/* Dark/Light Mode Switcher */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded bg-white/5 border border-white/10 text-gray-300 hover:text-white transition"
              title="Cambiar Tema"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-400" />}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Secondary Category Navigation Bar */}
        <div className="hidden md:flex items-center justify-between border-t border-white/10 py-2.5 text-xs font-semibold uppercase tracking-widest text-gray-400">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onSelectCategory('todos')}
              className={`px-3 py-1.5 rounded transition ${
                activeCategory === 'todos'
                  ? 'text-red-500 border-b-2 border-red-600 font-bold'
                  : 'hover:text-white'
              }`}
            >
              Todos
            </button>

            {/* Category Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded hover:text-white transition"
              >
                Categorías <ChevronDown className="w-3.5 h-3.5 text-yellow-600" />
              </button>

              {/* Mega Menu Dropdown */}
              {megaMenuOpen && (
                <div className="absolute left-0 top-full mt-2 w-80 bg-[#0f0f0f] border border-white/10 rounded-xl shadow-2xl p-4 z-50 grid grid-cols-1 gap-2">
                  <div className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest mb-1 px-2">
                    Catálogo de Bebidas & Cervezas
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setMegaMenuOpen(false);
                      }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition text-left group"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-10 h-10 rounded object-cover border border-white/10"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold text-white text-xs group-hover:text-yellow-500 transition">
                          {cat.name}
                        </div>
                        <div className="text-[10px] text-gray-400 line-clamp-1">
                          {cat.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded transition ${
                  activeCategory === cat.id
                    ? 'text-yellow-500 border-b-2 border-yellow-600 font-bold'
                    : 'hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-gray-400 text-[11px]">
            <span className="flex items-center gap-1.5 text-green-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Local Cuenca Abierto
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0f0f0f] p-4 space-y-3">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cervezas, whisky, vinos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded text-xs text-white"
            />
          </div>

          {/* Quick Actions Mobile */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                onOpenRuleta();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 p-2 rounded bg-yellow-600/20 border border-yellow-600/40 text-yellow-500 font-bold text-xs uppercase"
            >
              <Sparkles className="w-4 h-4" /> Ruleta ({userPoints} pts)
            </button>
            <button
              onClick={() => {
                onOpenDelivery();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 p-2 rounded bg-red-700/20 border border-red-600/40 text-red-500 font-bold text-xs uppercase"
            >
              <Truck className="w-4 h-4" /> LimonFast Tracker
            </button>
          </div>

          {/* Mobile Categories */}
          <div className="pt-2 border-t border-white/10">
            <div className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest mb-2">
              Categorías de Productos
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onSelectCategory('todos');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded text-xs font-bold text-left uppercase ${
                  activeCategory === 'todos' ? 'bg-red-700 text-white' : 'bg-white/5 text-gray-300'
                }`}
              >
                🍺 Todos los Productos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded text-xs font-semibold text-left truncate ${
                    activeCategory === cat.id ? 'bg-yellow-600 text-black font-bold' : 'bg-white/5 text-gray-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
