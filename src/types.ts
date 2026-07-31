export interface Product {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  abv?: number; // Alcohol By Volume %
  origin?: string;
  brewery?: string;
  volume?: string; // e.g. "330 ml", "750 ml", "Pack x6"
  description: string;
  tags?: string[];
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
  isDeal?: boolean;
  stock: number;
  image: string;
  gallery?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  itemCount: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minPurchase: number;
  description: string;
  active: boolean;
  expiresAt?: string;
}

export type OrderStatus = 'Pendiente' | 'Preparando' | 'En camino' | 'Entregado';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  province: string;
  city: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'visa_mastercard' | 'transfer' | 'qr_code' | 'jardin_azuayo' | 'jep' | 'cash';
  paymentDetails?: {
    accountNumber?: string;
    referenceNumber?: string;
    receiptUrl?: string;
  };
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryTime: string;
  driverName?: string;
  driverPhone?: string;
  driverLocation?: { lat: number; lng: number };
}

export interface RuletaPrize {
  id: string;
  label: string;
  description: string;
  type: 'points' | 'discount' | 'free_product' | 'coupon';
  value: string | number;
  color: string;
  textColor: string;
  couponCode?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  functions: string[];
  responsibilities: string[];
  deliverables: string[];
  avatar: string;
}

export interface AgileStage {
  number: number;
  title: string;
  summary: string;
  sections: {
    title: string;
    content: string | string[] | Record<string, any>;
  }[];
}

export interface AgilityImprovement {
  id: number;
  category: string; // Metodología, Arquitectura, Automatización, Infraestructura, Tecnología
  title: string;
  advantages: string[];
  disadvantages: string[];
  practicalApplication: string;
}
