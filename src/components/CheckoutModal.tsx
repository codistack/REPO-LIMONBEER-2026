import React, { useState } from 'react';
import { X, CreditCard, QrCode, Building2, Truck, ShieldCheck, CheckCircle2, Download, Printer, ArrowLeft } from 'lucide-react';
import { CartItem, Coupon, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  appliedCoupon: Coupon | null;
  onCompleteOrder: (orderData: Partial<Order>) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  appliedCoupon,
  onCompleteOrder
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form Fields
  const [customerName, setCustomerName] = useState('Juan Pérez');
  const [phone, setPhone] = useState('+593 99 123 4567');
  const [address, setAddress] = useState('Av. Solano y Remigio Crespo #4-12');
  const [province, setProvince] = useState('Azuay');
  const [city, setCity] = useState('Cuenca');
  const [notes, setNotes] = useState('Entregar frío en hielera de mano.');
  const [paymentMethod, setPaymentMethod] = useState<'visa_mastercard' | 'transfer' | 'qr_code' | 'jardin_azuayo' | 'jep' | 'cash'>('visa_mastercard');

  // Calculation
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  const taxIVA = taxableSubtotal * 0.12;
  const total = taxableSubtotal + taxIVA;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderData: Partial<Order> = {
      customerName,
      phone,
      address,
      province,
      city,
      notes,
      items: cart,
      subtotal,
      tax: taxIVA,
      discount: discountAmount,
      total,
      paymentMethod,
      status: 'Preparando'
    };

    const simulatedOrder: Order = {
      ...orderData as Order,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: '20-30 minutos',
      driverName: "Carlos 'Rayos' Rodríguez",
      driverPhone: "+593 98 765 4321"
    };

    setCreatedOrder(simulatedOrder);
    onCompleteOrder(simulatedOrder);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-neutral-900 dark:text-white my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-red-600 dark:text-amber-400 font-extrabold text-xs uppercase tracking-wider">
                <Truck className="w-4 h-4" /> Finalizar Pedido LimonBeer
              </div>
              <h2 className="text-2xl font-black text-neutral-900 dark:text-white mt-1">
                Datos de Envío & Método de Pago
              </h2>
            </div>

            {/* Grid 2 Cols: Form vs Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: Form Fields */}
              <div className="md:col-span-7 space-y-4">
                
                {/* Personal Info */}
                <div className="space-y-3">
                  <h3 className="font-bold text-xs uppercase text-neutral-400">1. Datos del Cliente</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">Nombre Completo</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">Teléfono WhatsApp</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-3 pt-2">
                  <h3 className="font-bold text-xs uppercase text-neutral-400">2. Dirección de Entrega</h3>
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-500 mb-1">Dirección Exacta</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">Provincia</label>
                      <input
                        type="text"
                        required
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-500 mb-1">Ciudad</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs font-semibold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-500 mb-1">Observaciones / Referencias</label>
                    <input
                      type="text"
                      placeholder="Ej. Casa de dos pisos pared roja..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs"
                    />
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-3 pt-2">
                  <h3 className="font-bold text-xs uppercase text-neutral-400">3. Método de Pago</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('visa_mastercard')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition ${
                        paymentMethod === 'visa_mastercard'
                          ? 'border-red-600 dark:border-amber-400 bg-red-50 dark:bg-amber-500/10'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-red-600 dark:text-amber-400" />
                      <span className="font-bold text-[11px] mt-2">Visa / MasterCard</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('qr_code')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition ${
                        paymentMethod === 'qr_code'
                          ? 'border-red-600 dark:border-amber-400 bg-red-50 dark:bg-amber-500/10'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-red-600 dark:text-amber-400" />
                      <span className="font-bold text-[11px] mt-2">Código QR Deuna</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('jardin_azuayo')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition ${
                        paymentMethod === 'jardin_azuayo'
                          ? 'border-red-600 dark:border-amber-400 bg-red-50 dark:bg-amber-500/10'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      <Building2 className="w-5 h-5 text-emerald-600" />
                      <span className="font-bold text-[11px] mt-2">Jardín Azuayo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('jep')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition ${
                        paymentMethod === 'jep'
                          ? 'border-red-600 dark:border-amber-400 bg-red-50 dark:bg-amber-500/10'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span className="font-bold text-[11px] mt-2">Cooperativa JEP</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition ${
                        paymentMethod === 'transfer'
                          ? 'border-red-600 dark:border-amber-400 bg-red-50 dark:bg-amber-500/10'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      <Building2 className="w-5 h-5 text-amber-500" />
                      <span className="font-bold text-[11px] mt-2">Transferencia</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition ${
                        paymentMethod === 'cash'
                          ? 'border-red-600 dark:border-amber-400 bg-red-50 dark:bg-amber-500/10'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      <Truck className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                      <span className="font-bold text-[11px] mt-2">Pago al Entregar</span>
                    </button>

                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary */}
              <div className="md:col-span-5 bg-neutral-50 dark:bg-neutral-800/50 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-sm mb-3 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-2">
                    Resumen de Productos
                  </h3>
                  
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {cart.map(({ product, quantity }) => (
                      <div key={product.id} className="flex justify-between text-xs">
                        <span className="font-bold line-clamp-1">{quantity}x {product.name}</span>
                        <span className="font-black">${(product.price * quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-1 text-xs text-neutral-500 dark:text-neutral-400 pt-4 border-t border-neutral-200 dark:border-neutral-700 mt-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-bold text-neutral-800 dark:text-neutral-200">${subtotal.toFixed(2)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                        <span>Descuento ({appliedCoupon.code}):</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>IVA 12%:</span>
                      <span className="font-bold text-neutral-800 dark:text-neutral-200">${taxIVA.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-neutral-900 dark:text-white pt-2 border-t border-neutral-200 dark:border-neutral-700">
                      <span>Total:</span>
                      <span className="text-amber-600 dark:text-amber-400 text-lg">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-red-600 to-amber-600 text-white font-extrabold text-sm shadow-lg shadow-red-600/30 transition transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Confirmar & Pagar ${total.toFixed(2)}</span>
                </button>
              </div>

            </div>
          </form>
        ) : (
          /* Order Confirmation & Receipt Screen */
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
                ¡Pedido Confirmado con Éxito!
              </span>
              <h2 className="text-3xl font-black text-neutral-900 dark:text-white">
                Comprobante de Pago #{createdOrder?.id}
              </h2>
              <p className="text-xs text-neutral-400">
                Tu pedido está siendo preparado por el equipo cervecero de LimonBeer.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="max-w-md mx-auto bg-neutral-50 dark:bg-neutral-800 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between border-b border-neutral-200 dark:border-neutral-700 pb-2">
                <span>Fecha: {new Date().toLocaleDateString()}</span>
                <span>Hora: {new Date().toLocaleTimeString()}</span>
              </div>
              <div>Cliente: <strong>{createdOrder?.customerName}</strong></div>
              <div>Dirección: <strong>{createdOrder?.address}</strong> ({createdOrder?.city})</div>
              <div>Método de Pago: <strong className="uppercase">{createdOrder?.paymentMethod}</strong></div>
              
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 font-bold text-amber-500 text-sm">
                TOTAL PAGADO: ${createdOrder?.total.toFixed(2)}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-neutral-200 dark:bg-neutral-800 font-bold text-xs flex items-center gap-2 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition"
              >
                <Printer className="w-4 h-4" /> Imprimir Comprobante
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-black font-extrabold text-xs shadow hover:bg-amber-400 transition"
              >
                Volver a la Tienda
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
