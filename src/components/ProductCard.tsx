import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Share2, Star, Flame, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
  onShare: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onOpenDetails,
  onShare
}) => {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div 
      onClick={() => onOpenDetails(product)}
      className="group relative bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden hover:border-yellow-600/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-black/60">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discount && (
            <span className="bg-red-700 text-white font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded border border-yellow-600/30 shadow-md">
              -{product.discount}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="bg-yellow-600 text-black font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
              NUEVO
            </span>
          )}
          {product.abv && (
            <span className="bg-black/80 backdrop-blur-md text-yellow-400 font-bold text-[10px] px-2 py-0.5 rounded border border-yellow-600/30 font-mono">
              {product.abv}% ABV
            </span>
          )}
        </div>

        {/* Top Right Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {/* Favorite Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition shadow-md ${
              isFavorite 
                ? 'bg-red-700 text-white border border-yellow-600/40' 
                : 'bg-black/60 text-white hover:bg-black border border-white/10'
            }`}
            title="Añadir a Favoritos"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Share Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare(product);
            }}
            className="p-2 rounded-full bg-black/60 text-white hover:bg-black border border-white/10 backdrop-blur-md transition shadow-md"
            title="Compartir Producto"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Hover Quick View Trigger Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="w-full py-2 px-3 rounded bg-black/90 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest hover:bg-red-700 flex items-center justify-center gap-2 border border-yellow-600/40 shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-yellow-500" />
            <span>Ver Detalles</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Origin */}
          <div className="flex items-center justify-between text-[10px] font-bold text-yellow-600 uppercase tracking-widest mb-1">
            <span>{product.category}</span>
            {product.origin && (
              <span className="truncate max-w-[120px] text-gray-400 font-normal">📍 {product.origin}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-white text-base line-clamp-2 group-hover:text-yellow-500 transition-colors">
            {product.name}
          </h3>

          {/* Volume / Presentation */}
          {product.volume && (
            <div className="text-xs text-gray-400 mt-1 font-medium">
              Presentación: <span className="font-bold text-gray-200">{product.volume}</span>
            </div>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1 text-xs">
          <div className="flex items-center text-yellow-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="ml-1 text-white">
              {product.rating}
            </span>
          </div>
          <span className="text-gray-400 text-[11px]">
            ({product.reviewsCount} reseñas)
          </span>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-red-500 font-mono">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-gray-500 line-through font-mono">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-green-400 font-bold">
              Stock: {product.stock} unids
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-bold text-xs uppercase tracking-widest transition border border-yellow-600/30 shadow-sm ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-red-700 hover:bg-red-600 text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>¡Listo!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-yellow-400" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
