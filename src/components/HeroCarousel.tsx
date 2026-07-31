import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Clock, Award, ShieldCheck, Flame, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCarouselProps {
  onExploreClick: () => void;
  onOpenRuleta: () => void;
  bannerImage?: string;
}

const SLIDES = [
  {
    id: 1,
    title: 'Edición Especial Cerveza Artesanal LimonBeer',
    subtitle: 'Lúpulos seleccionados de la Patagonia con infusión cítrica de limón sidra orgánico de Azuay.',
    badge: '🔥 MÁS VENDIDA 2026',
    tag: 'Cerveza IPA Imperial 6.8% ABV',
    price: '$3.50',
    oldPrice: '$4.80',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=1200&auto=format&fit=crop&q=80',
    cta: 'Comprar LimonBeer IPA',
    discount: '27% OFF'
  },
  {
    id: 2,
    title: 'Combos Fiesteros & Packs de Degustación',
    subtitle: 'Lleva 12 Cervezas Artesanales + Snacks de regalo con envío exprés en menos de 30 minutos.',
    badge: '📦 PROMO COMBO',
    tag: 'Ahorra $12.10 en tu pack',
    price: '$29.90',
    oldPrice: '$42.00',
    image: 'https://images.unsplash.com/photo-1566633806327-68e1deeda696?w=1200&auto=format&fit=crop&q=80',
    cta: 'Ver Promociones',
    discount: '29% OFF'
  },
  {
    id: 3,
    title: 'Licores Premium, Whisky & Tequila 100% Agave',
    subtitle: 'Reserva exclusiva de Don Julio, Johnnie Walker Black Label y Zacapa Centenario 23 Solera.',
    badge: '✨ LICORES DE LUJO',
    tag: 'Garantía de Autenticidad',
    price: 'Desde $12.90',
    oldPrice: '$16.50',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=1200&auto=format&fit=crop&q=80',
    cta: 'Explorar Licores',
    discount: '20% OFF'
  }
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onExploreClick, onOpenRuleta, bannerImage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-[#0f0f0f] text-white rounded-2xl my-6 border border-white/10 shadow-2xl">
      {/* Dynamic Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bannerImage || slide.image}
          alt={slide.title}
          className="w-full h-full object-cover object-center opacity-30 scale-105 transition-all duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      {/* Main Slide Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column Text */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-red-700 text-white text-[11px] font-bold px-3 py-1 rounded uppercase tracking-widest border border-yellow-600/30 shadow-md">
              {slide.badge}
            </span>
            <span className="bg-white/5 text-yellow-500 border border-yellow-600/40 text-[11px] font-bold px-3 py-1 rounded uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> {slide.tag}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-tight text-white">
            {slide.title.split('LimonBeer')[0]}
            <span className="text-yellow-500 font-serif italic">
              {slide.title.includes('LimonBeer') ? 'LimonBeer' : ''}
            </span>
            {slide.title.split('LimonBeer')[1]}
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            {slide.subtitle}
          </p>

          {/* Pricing Highlight */}
          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-3xl sm:text-4xl font-bold text-red-500 font-mono">
              {slide.price}
            </span>
            {slide.oldPrice && (
              <span className="text-sm text-gray-500 line-through font-mono">
                {slide.oldPrice}
              </span>
            )}
            <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2.5 py-1 rounded border border-green-500/30">
              {slide.discount}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="flex items-center gap-2 px-6 py-3 rounded bg-red-700 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest border border-yellow-600/30 shadow-lg transition transform active:scale-95"
            >
              <span>{slide.cta}</span>
              <ArrowRight className="w-4 h-4 text-yellow-400" />
            </button>

            <button
              onClick={onOpenRuleta}
              className="flex items-center gap-2 px-6 py-3 rounded bg-white/5 border border-yellow-600/50 hover:bg-white/10 text-yellow-500 font-bold text-xs uppercase tracking-widest transition transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Girar Ruleta</span>
            </button>
          </div>

          {/* Value Props Bar */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500 shrink-0" />
              <span>Envío en 30 Minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500 shrink-0" />
              <span>Garantía Artesanal</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-yellow-500 shrink-0" />
              <span>Pago Seguro</span>
            </div>
          </div>
        </div>

        {/* Right Column Featured Visual Showcase */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden border border-yellow-600/40 shadow-2xl group">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10">
              <div className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest">
                🌟 Destacado del Día
              </div>
              <div className="text-xs font-bold text-white mt-1">
                Cervezas Heladas Entregadas con Hielo Gratis
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">
                Usa el cupón <code className="bg-yellow-600/20 text-yellow-400 font-mono px-1 rounded">LIMON10</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-4 right-6 z-20 flex items-center gap-3">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
          className="p-2 rounded bg-black/60 hover:bg-red-700 hover:text-white border border-white/10 transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded transition-all ${
                idx === currentSlide ? 'w-8 bg-yellow-500' : 'w-2 bg-gray-700'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
          className="p-2 rounded bg-black/60 hover:bg-red-700 hover:text-white border border-white/10 transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
