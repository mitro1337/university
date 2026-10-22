import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './db.js';
import { productsRouter } from './routes/products.js';
import { checkoutRouter } from './routes/checkout.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsers (JSON + XML/Urlencoded for Netopia IPN postbacks)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root API status endpoint (strictly no HTML frontend returned)
app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'vexera-backend-api',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      categories: '/api/categories',
      checkout_order: '/api/checkout/order',
      health: '/api/health'
    }
  });
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Vexera API',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api', productsRouter);
app.use('/api/checkout', checkoutRouter);
// Direct alias for orders
app.get('/api/orders/:orderNumber', (req, res, next) => {
  req.url = `/orders/${req.params.orderNumber}`;
  checkoutRouter(req, res, next);
});

// Start server
async function startServer() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`[Vexera Backend] REST API running on http://localhost:${PORT}`);
      console.log(`[Vexera Backend] Endpoints ready: /api/products, /api/categories, /api/checkout/order, /api/checkout/stripe/confirm`);
    });
  } catch (error) {
    console.error('Fatal startup error:', error);
    process.exit(1);
  }
}

startServer();
