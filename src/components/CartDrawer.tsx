import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { CartItem, Coupon } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon 
    ? (subtotal * appliedCoupon.discountPercent) / 100 
    : 0;
  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  const taxIVA = taxableSubtotal * 0.12; // 12% IVA Ecuador
  const total = taxableSubtotal + taxIVA;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    onApplyCoupon(couponInput.trim().toUpperCase());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f0f0f] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-serif font-bold">Tu Carrito ({cart.reduce((a, c) => a + c.quantity, 0)})</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-3xl">
                  🍺
                </div>
                <div className="text-lg font-serif font-bold text-white">Tu carrito está vacío</div>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Explora nuestro catálogo de cervezas artesanales, tradicionales y licores para comenzar.
                </p>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div 
                  key={product.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-white truncate">
                      {product.name}
                    </h4>
                    <div className="text-xs text-red-500 font-mono font-bold mt-0.5">
                      ${product.price.toFixed(2)} c/u
                    </div>
                    {product.volume && (
                      <span className="text-[10px] text-gray-400">{product.volume}</span>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-[#0a0a0a] rounded border border-white/10">
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="p-1 hover:bg-white/10 rounded-l transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold">{quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="p-1 hover:bg-white/10 rounded-r transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-gray-400 hover:text-red-500 p-1 transition"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right font-mono font-bold text-sm text-yellow-500">
                    ${(product.price * quantity).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Coupon Code Section */}
          {cart.length > 0 && (
            <div className="px-6 py-3 border-t border-white/10 bg-[#0a0a0a]">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded bg-green-500/10 border border-green-500/30 text-xs">
                  <div className="flex items-center gap-2 text-green-400 font-bold">
                    <Tag className="w-4 h-4" />
                    <span>Cupón Aplicado: <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent}%)</span>
                  </div>
                  <button
                    onClick={onRemoveCoupon}
                    className="text-gray-400 hover:text-red-500 font-bold text-xs"
                  >
                    Quitar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Código (ej. LIMON10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded text-xs uppercase font-bold text-white focus:outline-none focus:border-yellow-600"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-500 text-black font-bold text-xs uppercase tracking-widest transition"
                  >
                    Aplicar
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Totals Summary & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 space-y-3 bg-[#0a0a0a]">
              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono font-bold text-gray-200">${subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-400 font-bold">
                    <span>Descuento Cupón ({appliedCoupon.code}):</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>IVA (12%):</span>
                  <span className="font-mono font-bold text-gray-200">${taxIVA.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-white pt-2 border-t border-white/10">
                  <span>Total a Pagar:</span>
                  <span className="text-yellow-500 font-mono">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 rounded bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-yellow-600/30 shadow-lg transition transform active:scale-95"
              >
                <span>Proceder al Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
