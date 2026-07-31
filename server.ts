import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_COUPONS } from "./src/data/productsData";
import { TEAM_MEMBERS, FIVE_AGILITY_IMPROVEMENTS, SCRUM_4_WEEK_SPRINT_SCHEDULE } from "./src/data/agileDocData";
import { Product, Order } from "./src/types";

const PORT = 3000;
const app = express();

app.use(express.json({ limit: "10mb" }));

// Local JSON File Data Paths
const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

// Ensure Data Directory Exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper to Read JSON
function readJSON<T>(filePath: string, defaultData: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), "utf-8");
      return defaultData;
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return defaultData;
  }
}

// Helper to Write JSON
function writeJSON<T>(filePath: string, data: T): boolean {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

// Initial Data Population
let productsStore = readJSON<Product[]>(PRODUCTS_FILE, INITIAL_PRODUCTS);
let ordersStore = readJSON<Order[]>(ORDERS_FILE, [
  {
    id: "ORD-9842",
    customerName: "Juan Pérez",
    phone: "+593 99 123 4567",
    address: "Av. Solano y Remigio Crespo #4-12",
    province: "Azuay",
    city: "Cuenca",
    notes: "Llamar al timbre blanco, departamento 2B",
    items: [
      { product: INITIAL_PRODUCTS[0], quantity: 2 },
      { product: INITIAL_PRODUCTS[7], quantity: 1 }
    ],
    subtotal: 36.90,
    tax: 4.43,
    discount: 3.69,
    total: 37.64,
    paymentMethod: "visa_mastercard",
    status: "En camino",
    createdAt: new Date().toISOString(),
    estimatedDeliveryTime: "18-25 minutos",
    driverName: "Carlos 'Rayos' Rodríguez",
    driverPhone: "+593 98 765 4321",
    driverLocation: { lat: -2.9001, lng: -79.0059 }
  }
]);

// --- API ENDPOINTS ---

// 1. Products REST
app.get("/api/products", (req, res) => {
  const category = req.query.category as string;
  const search = req.query.search as string;

  let filtered = [...productsStore];
  if (category && category !== 'todos') {
    filtered = filtered.filter(p => p.categoryId === category || p.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags?.some(t => t.toLowerCase().includes(q)));
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

app.post("/api/products", (req, res) => {
  const newProduct: Product = {
    ...req.body,
    id: `p-${Date.now()}`
  };
  productsStore.unshift(newProduct);
  writeJSON(PRODUCTS_FILE, productsStore);
  res.status(201).json({ success: true, data: newProduct });
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const index = productsStore.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Producto no encontrado" });
  }
  productsStore[index] = { ...productsStore[index], ...req.body };
  writeJSON(PRODUCTS_FILE, productsStore);
  res.json({ success: true, data: productsStore[index] });
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  productsStore = productsStore.filter(p => p.id !== id);
  writeJSON(PRODUCTS_FILE, productsStore);
  res.json({ success: true, message: "Producto eliminado correctamente" });
});

// 2. Categories
app.get("/api/categories", (req, res) => {
  res.json({ success: true, data: INITIAL_CATEGORIES });
});

// 3. Coupons
app.get("/api/coupons", (req, res) => {
  res.json({ success: true, data: INITIAL_COUPONS });
});

// 4. Orders & LimonFast Tracking
app.get("/api/orders", (req, res) => {
  res.json({ success: true, data: ordersStore });
});

app.get("/api/orders/:id", (req, res) => {
  const order = ordersStore.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Pedido no encontrado" });
  }
  res.json({ success: true, data: order });
});

app.post("/api/orders", (req, res) => {
  const newOrder: Order = {
    ...req.body,
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "Preparando",
    createdAt: new Date().toISOString(),
    estimatedDeliveryTime: "20-30 minutos",
    driverName: "Gabriel - Motorizado LimonFast #3",
    driverPhone: "+593 99 888 7766",
    driverLocation: { lat: -2.8974, lng: -79.0045 }
  };
  ordersStore.unshift(newOrder);
  writeJSON(ORDERS_FILE, ordersStore);
  res.status(201).json({ success: true, data: newOrder });
});

app.put("/api/orders/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = ordersStore.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Pedido no encontrado" });
  }
  order.status = status;
  writeJSON(ORDERS_FILE, ordersStore);
  res.json({ success: true, data: order });
});

// 5. Agile Documentation & Team API
app.get("/api/agile-docs", (req, res) => {
  res.json({
    success: true,
    data: {
      team: TEAM_MEMBERS,
      schedule: SCRUM_4_WEEK_SPRINT_SCHEDULE,
      improvements: FIVE_AGILITY_IMPROVEMENTS
    }
  });
});

async function startServer() {
  // Vite middleware in Development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LIMONBEER Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
