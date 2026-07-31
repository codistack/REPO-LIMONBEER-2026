import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Truck, ShieldCheck, Share2, Plus, Minus, Check, Beer, Award, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onShare: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onShare
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded bg-black/70 text-white hover:bg-red-700 transition border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column - Product Image Gallery */}
          <div className="relative p-6 bg-[#0a0a0a] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg mb-4 bg-black/60 border border-white/10">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.discount && (
                <span className="absolute top-3 left-3 bg-red-700 text-white font-bold text-xs uppercase tracking-widest px-3 py-1 rounded border border-yellow-600/30 shadow-md">
                  -{product.discount}% DESCUENTO
                </span>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto w-full py-1">
                <button
                  onClick={() => setSelectedImage(product.image)}
                  className={`w-16 h-16 rounded overflow-hidden border-2 transition ${
                    selectedImage === product.image ? 'border-yellow-500' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={product.image} alt="Thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded overflow-hidden border-2 transition ${
                      selectedImage === img ? 'border-yellow-500' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details, Specs & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Tags */}
              <div className="flex items-center justify-between text-xs font-bold text-yellow-500 uppercase tracking-widest">
                <span>{product.category}</span>
                <span className="text-gray-400 font-mono">ID: {product.id}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
                {product.name}
              </h2>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center text-yellow-500 font-bold">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-gray-400">({product.reviewsCount} opiniones)</span>
                <span className="text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/30">
                  Stock: {product.stock} unids
                </span>
              </div>

              {/* Price Banner */}
              <div className="flex items-baseline gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="text-3xl font-bold font-mono text-red-500">
                  ${product.price.toFixed(2)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-500 line-through font-mono">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
                {product.volume && (
                  <span className="text-xs font-semibold text-gray-300 ml-auto">
                    {product.volume}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Technical Specs Matrix */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-black/40 p-3 rounded-lg border border-white/10">
                {product.abv && (
                  <div>
                    <span className="text-yellow-600 block text-[10px] uppercase font-bold tracking-widest">Grado Alcohólico</span>
                    <span className="font-bold text-white text-sm font-mono">{product.abv}% Vol.</span>
                  </div>
                )}
                {product.brewery && (
                  <div>
                    <span className="text-yellow-600 block text-[10px] uppercase font-bold tracking-widest">Cervecería</span>
                    <span className="font-bold text-white truncate block">{product.brewery}</span>
                  </div>
                )}
                {product.origin && (
                  <div>
                    <span className="text-yellow-600 block text-[10px] uppercase font-bold tracking-widest">Origen</span>
                    <span className="font-bold text-white">📍 {product.origin}</span>
                  </div>
                )}
                {product.tags && product.tags.length > 0 && (
                  <div>
                    <span className="text-yellow-600 block text-[10px] uppercase font-bold tracking-widest">Estilo</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {product.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="bg-yellow-600/20 text-yellow-400 text-[10px] px-1.5 py-0.2 rounded font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              {/* Quantity Selector & Add to Cart */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white/5 rounded p-1 border border-white/10">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-white/10 rounded transition"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-white font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 hover:bg-white/10 rounded transition"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-4 rounded font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-yellow-600/30 shadow-lg transition transform active:scale-95 ${
                    added
                      ? 'bg-green-600 text-white'
                      : 'bg-red-700 hover:bg-red-600 text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>¡Añadido al Carrito!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-yellow-400" />
                      <span>Agregar • ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Secondary Buttons */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <button
                  onClick={() => onToggleFavorite(product)}
                  className="flex items-center gap-1.5 hover:text-red-500 transition"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                  <span>{isFavorite ? 'En Favoritos' : 'Añadir a Favoritos'}</span>
                </button>

                <button
                  onClick={() => onShare(product)}
                  className="flex items-center gap-1.5 hover:text-yellow-500 transition"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartir</span>
                </button>

                <div className="flex items-center gap-1 text-green-400 font-bold">
                  <Truck className="w-4 h-4" />
                  <span>LimonFast Express 30m</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
