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

// Root landing page & API overview
app.get('/', (req, res) => {
  if (req.accepts('html')) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(`<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vexera REST API • Backend Server</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #090d16;
      color: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 24px;
    }
    .card {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 20px;
      padding: 36px;
      max-width: 580px;
      width: 100%;
      box-shadow: 0 20px 40px -15px rgba(0,0,0,0.7);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 16px;
    }
    .dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; }
    h1 { font-size: 26px; font-weight: 800; margin-bottom: 8px; color: #ffffff; }
    p { font-size: 14px; color: #94a3b8; line-height: 1.6; margin-bottom: 24px; }
    .btn-main {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: #ffffff;
      color: #0f172a;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
      padding: 12px 24px;
      border-radius: 12px;
      width: 100%;
      transition: background 0.2s;
      margin-bottom: 24px;
    }
    .btn-main:hover { background: #e2e8f0; }
    .endpoints-title {
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 12px;
    }
    .endpoints {
      display: grid;
      gap: 8px;
      margin-bottom: 20px;
    }
    .endpoint {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: #1e293b;
      border-radius: 8px;
      text-decoration: none;
      color: #cbd5e1;
      font-size: 12px;
      font-family: monospace;
      transition: all 0.15s;
    }
    .endpoint:hover { background: #334155; color: #ffffff; }
    .method { color: #38bdf8; font-weight: bold; }
    .info { font-size: 12px; color: #64748b; text-align: center; font-family: monospace; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">
      <span class="dot"></span>
      Backend Server Online
    </div>
    <h1>Vexera REST API</h1>
    <p>Acesta este serverul backend de date (port <strong>3001</strong>). Magazinul online și interfața utilizator rulează pe portul <strong>4200</strong>.</p>
    
    <a href="http://localhost:4200" class="btn-main">
      <span>Deschide Magazinul Vexera (Frontend :4200)</span>
      <span>→</span>
    </a>

    <div class="endpoints-title">Endpoint-uri API disponibile</div>
    <div class="endpoints">
      <a href="/api/products" class="endpoint">
        <span><span class="method">GET</span> /api/products</span>
        <span>180 produse active (.99 lei) ↗</span>
      </a>
      <a href="/api/categories" class="endpoint">
        <span><span class="method">GET</span> /api/categories</span>
        <span>7 categorii tehnice ↗</span>
      </a>
      <a href="/api/facets" class="endpoint">
        <span><span class="method">GET</span> /api/facets</span>
        <span>Filtre fațetate ↗</span>
      </a>
      <a href="/api/health" class="endpoint">
        <span><span class="method">GET</span> /api/health</span>
        <span>Stare sistem (OK) ↗</span>
      </a>
    </div>

    <div class="info">S.C. VEXERA HARDWARE S.R.L. • Node.js Express REST API</div>
  </div>
</body>
</html>`);
  }

  res.json({
    service: 'Vexera Backend REST API',
    status: 'online',
    store_frontend: 'http://localhost:4200',
    total_products: 180,
    charm_pricing: 'active (.99 RON)',
    endpoints: {
      products: '/api/products',
      categories: '/api/categories',
      facets: '/api/facets',
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
