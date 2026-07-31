import React, { useState } from 'react';
import { 
  Package, 
  ShoppingBag, 
  Tag, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Check, 
  X, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Truck,
  Sparkles
} from 'lucide-react';
import { Product, Order, Coupon, Category, OrderStatus } from '../types';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Partial<Product>) => void;
  onUpdateProduct: (id: string, product: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (id: string, status: OrderStatus) => void;
  coupons: Coupon[];
  onAddCoupon: (coupon: Coupon) => void;
  categories: Category[];
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
  coupons,
  onAddCoupon,
  categories,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'coupons' | 'metrics'>('products');

  // New Product Form State
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Cerveza Artesanal');
  const [newProductPrice, setNewProductPrice] = useState('3.80');
  const [newProductOldPrice, setNewProductOldPrice] = useState('4.50');
  const [newProductABV, setNewProductABV] = useState('5.5');
  const [newProductStock, setNewProductStock] = useState('50');
  const [newProductImage, setNewProductImage] = useState('https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&auto=format&fit=crop&q=80');
  const [newProductDesc, setNewProductDesc] = useState('Cerveza artesanal de alta fermentación elaborada con ingredientes premium.');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({
      name: newProductName,
      category: newProductCategory,
      categoryId: categories.find(c => c.name === newProductCategory)?.id || 'cat-artesanal',
      price: parseFloat(newProductPrice),
      oldPrice: parseFloat(newProductOldPrice),
      abv: parseFloat(newProductABV),
      stock: parseInt(newProductStock),
      image: newProductImage,
      description: newProductDesc,
      rating: 5.0,
      reviewsCount: 1
    });
    setIsCreatingProduct(false);
    setNewProductName('');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-neutral-900 border border-neutral-800 p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-2xl">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">PANEL ADMINISTRATIVO LIMONBEER</h1>
            <p className="text-xs text-neutral-400">Gestión de Inventario, Pedidos en Vivo y Métricas Comerciales</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold transition flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Volver a Tienda
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex gap-2 border-b border-neutral-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition ${
            activeTab === 'products' ? 'bg-amber-500 text-black shadow' : 'bg-neutral-900 text-neutral-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" /> Gestión Productos ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition ${
            activeTab === 'orders' ? 'bg-amber-500 text-black shadow' : 'bg-neutral-900 text-neutral-400 hover:text-white'
          }`}
        >
          <Truck className="w-4 h-4" /> Pedidos LimonFast ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition ${
            activeTab === 'coupons' ? 'bg-amber-500 text-black shadow' : 'bg-neutral-900 text-neutral-400 hover:text-white'
          }`}
        >
          <Tag className="w-4 h-4" /> Cupones ({coupons.length})
        </button>

        <button
          onClick={() => setActiveTab('metrics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs transition ${
            activeTab === 'metrics' ? 'bg-amber-500 text-black shadow' : 'bg-neutral-900 text-neutral-400 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Métricas & Ventas
        </button>
      </div>

      {/* TAB 1: PRODUCTS CRUD */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Catálogo de Bebidas</h2>
            <button
              onClick={() => setIsCreatingProduct(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition"
            >
              <Plus className="w-4 h-4" /> Agregar Producto
            </button>
          </div>

          {/* New Product Form */}
          {isCreatingProduct && (
            <form onSubmit={handleCreateProduct} className="bg-neutral-900 border border-amber-500/40 p-5 rounded-2xl space-y-4">
              <h3 className="font-bold text-sm text-amber-400">Crear Nuevo Producto</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  required
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-xs"
                />
                <select
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value)}
                  className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-xs"
                >
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Precio $"
                  required
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-xs"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  value={newProductStock}
                  onChange={(e) => setNewProductStock(e.target.value)}
                  className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-xs"
                />
                <input
                  type="text"
                  placeholder="URL Imagen"
                  required
                  value={newProductImage}
                  onChange={(e) => setNewProductImage(e.target.value)}
                  className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-xs col-span-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingProduct(false)}
                  className="px-3 py-1.5 rounded-xl bg-neutral-800 text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-amber-500 text-black font-bold text-xs"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          )}

          {/* Product Table */}
          <div className="overflow-x-auto bg-neutral-900 border border-neutral-800 rounded-2xl">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-neutral-800 text-neutral-400 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3">Imagen</th>
                  <th className="p-3">Producto</th>
                  <th className="p-3">Categoría</th>
                  <th className="p-3">Precio</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-800/40">
                    <td className="p-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    </td>
                    <td className="p-3 font-bold text-white">{p.name}</td>
                    <td className="p-3 text-amber-400">{p.category}</td>
                    <td className="p-3 font-black">${p.price.toFixed(2)}</td>
                    <td className="p-3">{p.stock} unids</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition"
                        title="Eliminar Producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Gestión de Pedidos & Rastreo LimonFast</h2>
          <div className="space-y-3">
            {orders.map((ord) => (
              <div key={ord.id} className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-amber-400">#{ord.id}</span>
                    <span className="text-xs text-neutral-400">{new Date(ord.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">{ord.customerName} - {ord.phone}</div>
                  <div className="text-xs text-neutral-400">{ord.address} ({ord.city})</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-black text-lg text-emerald-400">${ord.total.toFixed(2)}</span>
                  <select
                    value={ord.status}
                    onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                    className="px-3 py-1.5 bg-neutral-800 border border-amber-500/50 rounded-xl text-xs font-bold text-amber-400"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Preparando">Preparando</option>
                    <option value="En camino">En camino</option>
                    <option value="Entregado">Entregado</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COUPONS */}
      {activeTab === 'coupons' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Cupones de Descuento Activos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div key={c.code} className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="flex justify-between font-mono font-black text-amber-400 text-base">
                  <span>{c.code}</span>
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded">-{c.discountPercent}%</span>
                </div>
                <p className="text-xs text-neutral-400">{c.description}</p>
                <div className="text-[10px] text-neutral-500">Mínimo compra: ${c.minPurchase}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: METRICS */}
      {activeTab === 'metrics' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 text-center space-y-1">
            <div className="text-xs text-neutral-400 font-bold uppercase">Ventas Totales</div>
            <div className="text-3xl font-black text-emerald-400">$1,480.50</div>
          </div>
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 text-center space-y-1">
            <div className="text-xs text-neutral-400 font-bold uppercase">Pedidos Completados</div>
            <div className="text-3xl font-black text-amber-400">42</div>
          </div>
          <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 text-center space-y-1">
            <div className="text-xs text-neutral-400 font-bold uppercase">Clientes Activos</div>
            <div className="text-3xl font-black text-red-500">128</div>
          </div>
        </div>
      )}

    </div>
  );
};
