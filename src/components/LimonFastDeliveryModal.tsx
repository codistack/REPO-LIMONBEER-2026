import React, { useState, useEffect } from 'react';
import { X, Truck, Clock, MapPin, Phone, CheckCircle2, ShieldCheck, Navigation, AlertCircle } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface LimonFastDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrder: Order | null;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export const LimonFastDeliveryModal: React.FC<LimonFastDeliveryModalProps> = ({
  isOpen,
  onClose,
  activeOrder,
  onUpdateOrderStatus
}) => {
  if (!isOpen) return null;

  // Driver animation simulation along route
  const [driverPos, setDriverPos] = useState({ x: 25, y: 65 });

  useEffect(() => {
    const interval = setInterval(() => {
      setDriverPos((prev) => ({
        x: (prev.x + 0.5) % 80 + 10,
        y: Math.sin(prev.x / 10) * 15 + 50
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const statuses: OrderStatus[] = ['Pendiente', 'Preparando', 'En camino', 'Entregado'];

  const getStatusIndex = (s: OrderStatus) => statuses.indexOf(s);
  const currentIdx = activeOrder ? getStatusIndex(activeOrder.status) : 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-neutral-900 border border-red-600/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center shadow-lg shadow-red-600/30">
            <Truck className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">LIMONFAST DELIVERY</h2>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-500/30">
                GPS EN VIVO
              </span>
            </div>
            <p className="text-neutral-400 text-xs">
              Seguimiento en tiempo real de tu pedido con motorizados equipados con hielera térmica.
            </p>
          </div>
        </div>

        {activeOrder ? (
          <div className="space-y-6">
            
            {/* Status Steps Progress Bar */}
            <div className="bg-black/60 p-5 rounded-2xl border border-neutral-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-neutral-400">Estado del Pedido #{activeOrder.id}</span>
                <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                  ETA: {activeOrder.estimatedDeliveryTime}
                </span>
              </div>

              <div className="relative flex items-center justify-between">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-neutral-800 -translate-y-1/2 z-0" />
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-red-600 to-amber-500 -translate-y-1/2 z-0 transition-all duration-500"
                  style={{ width: `${(currentIdx / (statuses.length - 1)) * 100}%` }}
                />

                {statuses.map((s, idx) => {
                  const isCompleted = idx <= currentIdx;
                  return (
                    <div key={s} className="relative z-10 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                        isCompleted
                          ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/40'
                          : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                      }`}>
                        {idx + 1}
                      </div>
                      <span className={`text-[10px] font-bold mt-2 ${
                        isCompleted ? 'text-amber-400' : 'text-neutral-500'
                      }`}>
                        {s}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Demo Status Change Selector for User to Test Live Updates */}
              <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Simular Cambio de Estado:</span>
                <div className="flex items-center gap-1">
                  {statuses.map((st) => (
                    <button
                      key={st}
                      onClick={() => onUpdateOrderStatus(activeOrder.id, st)}
                      className={`px-2.5 py-1 rounded-lg font-bold text-[10px] transition ${
                        activeOrder.status === st
                          ? 'bg-red-600 text-white'
                          : 'bg-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Live GPS Map Visualizer */}
            <div className="relative h-56 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 p-4">
              {/* Map Canvas Background Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

              {/* Store Pin (Start) */}
              <div className="absolute top-12 left-10 z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-xs shadow-lg">
                  🍺
                </div>
                <span className="text-[10px] font-bold bg-black/80 px-1.5 py-0.5 rounded text-amber-400 mt-1">
                  Local LimonBeer
                </span>
              </div>

              {/* Customer Pin (Destination) */}
              <div className="absolute bottom-12 right-12 z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-xs shadow-lg animate-bounce">
                  🏠
                </div>
                <span className="text-[10px] font-bold bg-black/80 px-1.5 py-0.5 rounded text-emerald-400 mt-1 truncate max-w-[100px]">
                  {activeOrder.customerName}
                </span>
              </div>

              {/* Simulated Driver Icon Moving */}
              <div 
                className="absolute z-20 transition-all duration-1000 ease-linear flex flex-col items-center"
                style={{ left: `${driverPos.x}%`, top: `${driverPos.y}%` }}
              >
                <div className="w-9 h-9 rounded-full bg-amber-500 border-2 border-black flex items-center justify-center shadow-2xl text-black">
                  <Truck className="w-5 h-5 animate-pulse" />
                </div>
                <span className="text-[9px] font-extrabold bg-amber-500 text-black px-1.5 py-0.2 rounded shadow mt-0.5 whitespace-nowrap">
                  🏍️ Motorizado LimonFast
                </span>
              </div>
            </div>

            {/* Driver & Order Details Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Driver Card */}
              <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-neutral-800 border border-amber-500/50 flex items-center justify-center font-bold text-amber-400 text-lg">
                  👨‍✈️
                </div>
                <div>
                  <div className="text-[11px] text-neutral-400 font-bold uppercase">Conductor Asignado</div>
                  <div className="font-extrabold text-sm text-white">{activeOrder.driverName || "Carlos 'Rayos' Rodríguez"}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href={`tel:${activeOrder.driverPhone || '+593987654321'}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:underline"
                    >
                      <Phone className="w-3 h-3" /> Llamar Conductor
                    </a>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="p-4 rounded-2xl bg-black/60 border border-neutral-800 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-neutral-400 font-bold uppercase">Dirección de Entrega</div>
                  <div className="font-bold text-sm text-white line-clamp-1">{activeOrder.address}</div>
                  <div className="text-xs text-neutral-400">{activeOrder.city}, {activeOrder.province}</div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-12 space-y-3">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
            <div className="text-lg font-bold text-white">No tienes un pedido activo en este momento</div>
            <p className="text-xs text-neutral-400">
              Agrega tus cervezas favoritas al carrito y realiza un pedido para rastrear la entrega en vivo.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
