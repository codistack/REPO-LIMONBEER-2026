import React, { useState } from 'react';
import { X, Sparkles, Award, Gift, Check, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { RULETA_PRIZES } from '../data/productsData';
import { RuletaPrize } from '../types';

interface RuletaModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPoints: number;
  onAddPoints: (points: number) => void;
  onAddWonCoupon: (code: string) => void;
}

export const RuletaModal: React.FC<RuletaModalProps> = ({
  isOpen,
  onClose,
  userPoints,
  onAddPoints,
  onAddWonCoupon
}) => {
  if (!isOpen) return null;

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<RuletaPrize | null>(null);
  const [claimed, setClaimed] = useState(false);

  const handleSpin = () => {
    if (spinning) return;

    setSpinning(true);
    setWonPrize(null);
    setClaimed(false);

    // Pick random prize index
    const randomIndex = Math.floor(Math.random() * RULETA_PRIZES.length);
    const prize = RULETA_PRIZES[randomIndex];

    // Calculate rotation angle (each slice is 360 / RULETA_PRIZES.length = 60 degrees)
    const sliceAngle = 360 / RULETA_PRIZES.length;
    // Extra full spins (5 spins = 1800 deg) + target angle
    const totalExtraSpins = 5 * 360;
    // Align index to pointer at top (270deg offset)
    const targetAngle = totalExtraSpins + (360 - randomIndex * sliceAngle) - sliceAngle / 2;

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setWonPrize(prize);

      // Process rewards automatically
      if (prize.type === 'points') {
        onAddPoints(Number(prize.value));
      } else if (prize.couponCode) {
        onAddWonCoupon(prize.couponCode);
      }
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Glowing Effects */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-red-600/20 rounded-full blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider border border-amber-500/30">
            <Sparkles className="w-4 h-4 text-amber-400" /> RULETA GANADORA LIMONBEER
          </div>
          <h2 className="text-3xl font-black text-white">
            ¡Gira la Ruleta y Gana Premios Instantáneos!
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto">
            Acumula puntos en cada compra o girando diariamente. Canjea tus puntos por cerveza artesanal, whisky, combos o cupones de descuento.
          </p>
        </div>

        {/* Points Display */}
        <div className="flex items-center justify-center gap-2 mb-6 bg-black/60 p-3 rounded-2xl border border-neutral-800 max-w-xs mx-auto">
          <Award className="w-5 h-5 text-amber-400" />
          <span className="text-xs text-neutral-300">Tus Puntos Acumulados:</span>
          <span className="text-lg font-black text-amber-400">{userPoints} pts</span>
        </div>

        {/* Wheel Canvas Visualizer */}
        <div className="relative flex justify-center items-center my-6">
          {/* Wheel Top Pointer / Arrow */}
          <div className="absolute -top-4 z-20 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-amber-400 drop-shadow-md" />

          {/* The Rotating Wheel */}
          <div 
            className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-8 border-amber-500 shadow-2xl overflow-hidden transition-all duration-[4000ms] cubic-bezier(0.15, 0.9, 0.25, 1)"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {RULETA_PRIZES.map((prize, idx) => {
              const angle = (360 / RULETA_PRIZES.length) * idx;
              return (
                <div
                  key={prize.id}
                  className="absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left flex items-center justify-center p-2 text-center"
                  style={{
                    backgroundColor: prize.color,
                    color: prize.textColor,
                    transform: `rotate(${angle}deg) skewY(-30deg)`,
                    borderRight: '2px solid rgba(0,0,0,0.3)'
                  }}
                >
                  <span 
                    className="text-xs sm:text-sm font-black transform rotate-45 translate-x-2 -translate-y-2 whitespace-nowrap drop-shadow"
                    style={{ transform: 'skewY(30deg) rotate(45deg)' }}
                  >
                    {prize.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center Spin Wheel Button */}
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="absolute z-30 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl border-4 border-amber-300 flex items-center justify-center hover:scale-110 active:scale-95 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {spinning ? <RefreshCw className="w-6 h-6 animate-spin" /> : 'GIRAR'}
          </button>
        </div>

        {/* Won Prize Celebration Modal Banner */}
        {wonPrize && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-red-600/20 to-amber-500/20 border border-amber-500/50 text-center animate-bounce-short">
            <div className="flex items-center justify-center gap-2 text-amber-400 font-extrabold text-sm uppercase">
              <Gift className="w-5 h-5" /> ¡FELICITACIONES! GANASTE:
            </div>
            <div className="text-2xl font-black text-white mt-1">
              {wonPrize.label}
            </div>
            <p className="text-xs text-neutral-300 mt-1">
              {wonPrize.description}
            </p>
            {wonPrize.couponCode && (
              <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-black/80 rounded-xl border border-amber-400">
                <span className="text-xs text-neutral-400">Cupón Aplicable:</span>
                <code className="text-sm font-mono font-black text-amber-400">
                  {wonPrize.couponCode}
                </code>
              </div>
            )}
          </div>
        )}

        {/* Rules & Logic Explanation */}
        <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-1">
          <div className="font-bold text-amber-400">💡 Lógica del Sistema de Recompensas:</div>
          <p>• Acumulas 10 Puntos LimonBeer por cada $1.00 comprado en la tienda.</p>
          <p>• Tienes 1 Giro Gratuito por día en la ruleta.</p>
          <p>• Los cupones ganados se aplican automáticamente en la pantalla de Checkout.</p>
        </div>

      </div>
    </div>
  );
};
