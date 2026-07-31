import React from 'react';
import { Beer, MapPin, Clock, Phone, Mail, Instagram, Facebook, MessageCircle, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-[#050505] text-white border-t border-white/10">
      
      {/* Google Maps Store Location Simulation Banner */}
      <div className="relative bg-[#0a0a0a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Store Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-600/20 text-yellow-500 font-bold text-xs uppercase tracking-widest border border-yellow-600/30">
              <MapPin className="w-4 h-4 text-yellow-500" /> LOCAL FÍSICO LIMONBEER CUENCA
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">
              Visítanos en Nuestra Cervecería Boutique
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Disfruta de nuestros chops helados de cerveza artesanal recién tirada o retira tus pedidos realizados en la web.
            </p>

            <div className="space-y-2 text-xs text-gray-300 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span>Av. Solano y Remigio Crespo Toral #4-12, Cuenca, Ecuador</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-500 shrink-0" />
                <span><strong>Horario de Atención:</strong> Lunes a Domingo 10:00 - 23:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-400 shrink-0" />
                <span>Teléfono: +593 7 284 5555 | WhatsApp: +593 99 123 4567</span>
              </div>
            </div>
          </div>

          {/* Right Simulated Google Map Canvas */}
          <div className="lg:col-span-7 relative h-64 rounded-xl overflow-hidden border border-yellow-600/30 shadow-2xl bg-[#050505]">
            {/* Map Grid Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

            {/* Map Streets Illustration */}
            <svg className="absolute inset-0 w-full h-full opacity-30 stroke-neutral-700" strokeWidth="3">
              <line x1="0" y1="100" x2="600" y2="100" />
              <line x1="0" y1="180" x2="600" y2="180" />
              <line x1="200" y1="0" x2="200" y2="300" />
              <line x1="420" y1="0" x2="420" y2="300" />
            </svg>

            {/* Central Store Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-red-700 border-2 border-yellow-500 flex items-center justify-center shadow-2xl animate-bounce">
                  <Beer className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-black/60 rounded-full blur-xs" />
              </div>
              <div className="mt-2 bg-[#0a0a0a]/90 backdrop-blur-md px-3 py-1 rounded border border-yellow-600/40 text-center shadow-xl">
                <div className="text-xs font-serif font-bold text-yellow-500">LimonBeer Craft House</div>
                <div className="text-[10px] text-gray-300">★ 4.9 (480 Reseñas Google)</div>
              </div>
            </div>

            {/* Map Action Button Overlay */}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 z-20 px-3 py-1.5 rounded bg-black/80 hover:bg-red-700 text-yellow-500 hover:text-white font-bold text-xs uppercase tracking-widest border border-yellow-600/40 shadow-lg transition"
            >
              Abrir en Google Maps ↗
            </a>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs text-gray-400">
        
        {/* Brand Summary */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-red-700 border border-yellow-600 flex items-center justify-center font-serif font-bold text-yellow-500">
              L
            </div>
            <span className="text-xl font-serif font-bold text-white tracking-tight">
              LIMON<span className="text-red-600">BEER</span>
            </span>
          </div>
          <p className="leading-relaxed text-gray-400">
            Tienda boutique especializada en cerveza artesanal, tradicional, licores premium y combos exclusivos para todo tipo de celebración.
          </p>
          <div className="text-[11px] text-yellow-600 font-bold">
            © 2026 LimonBeer Inc. Todos los derechos reservados.
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-white text-sm uppercase tracking-widest text-yellow-600">Categorías</h4>
          <ul className="space-y-2">
            <li><a href="#artesanal" className="hover:text-yellow-500 transition">Cerveza Artesanal IPA & Stout</a></li>
            <li><a href="#tradicional" className="hover:text-yellow-500 transition">Cervezas Pilsen & Lager</a></li>
            <li><a href="#vinos" className="hover:text-yellow-500 transition">Vinos Tinto & Blancos Reserva</a></li>
            <li><a href="#whisky" className="hover:text-yellow-500 transition">Whisky Escocés & Tequila 100% Agave</a></li>
            <li><a href="#combos" className="hover:text-yellow-500 transition">Promociones & Combos Fiesteros</a></li>
          </ul>
        </div>

        {/* Services & Delivery */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-white text-sm uppercase tracking-widest text-yellow-600">Servicios LimonBeer</h4>
          <ul className="space-y-2">
            <li><span className="text-gray-300">🚀 Entregas Expresas LimonFast</span></li>
            <li><span className="text-gray-300">🎰 Ruleta de Premios & Puntos</span></li>
            <li><span className="text-gray-300">💳 Métricas & Pasarelas Simuladas</span></li>
            <li><span className="text-gray-300">🔒 Pago Seguro en Entrega o QR</span></li>
            <li><span className="text-gray-300">📋 Documentación Metodología Scrum</span></li>
          </ul>
        </div>

        {/* Social Media & Contact */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-white text-sm uppercase tracking-widest text-yellow-600">Redes Sociales</h4>
          <p>Síguenos para sorteos semanales y promociones relámpago:</p>
          <div className="flex items-center gap-3">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded bg-white/5 border border-white/10 text-gray-300 hover:text-yellow-500 hover:border-yellow-600/40 transition"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded bg-white/5 border border-white/10 text-gray-300 hover:text-yellow-500 hover:border-yellow-600/40 transition"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://whatsapp.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 rounded bg-white/5 border border-white/10 text-gray-300 hover:text-green-400 hover:border-green-500/40 transition"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
          <div className="pt-2 text-[10px] text-gray-500">
            Venta prohibida a menores de 18 años. Consume con responsabilidad.
          </div>
        </div>

      </div>
    </footer>
  );
};
