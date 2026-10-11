import { Router, Request, Response } from 'express';
import { pool } from '../db.js';

export const productsRouter = Router();

// GET /api/categories - List categories with product count
productsRouter.get('/categories', async (_req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query(`
      SELECT c.*, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id
      GROUP BY c.id
      ORDER BY c.sort_order ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET /api/facets - Get available filter values
productsRouter.get('/facets', async (_req: Request, res: Response) => {
  try {
    const [subcats]: any = await pool.query('SELECT DISTINCT subcategory FROM products ORDER BY subcategory ASC');
    const [priceRange]: any = await pool.query('SELECT MIN(price_ron) as min_price, MAX(price_ron) as max_price FROM products');

    res.json({
      subcategories: subcats.map((r: any) => r.subcategory),
      minPrice: Math.floor(priceRange[0].min_price || 0),
      maxPrice: Math.ceil(priceRange[0].max_price || 2000),
      voltages: ['3.3V', '5V', '12V', '24V', '48V PoE', '230V AC'],
      interfaces: ['I2C', 'SPI', 'UART', '10GbE SFP+', '25GbE SFP28', '2.5GbE', 'Gigabit Ethernet', 'PCIe 3.0 / 4.0', 'Wi-Fi 6 / BT', 'Zigbee / Thread / Matter', 'RS485 / CAN Bus', 'USB-C / PD']
    });
  } catch (error) {
    console.error('Error fetching facets:', error);
    res.status(500).json({ error: 'Failed to fetch facets' });
  }
});

// GET /api/products - Filtered product listing
productsRouter.get('/products', async (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      subcategory,
      inStock,
      featured,
      minPrice,
      maxPrice,
      voltage,
      interface: iface,
      sortBy = 'featured',
      limit = '250',
      offset = '0'
    } = req.query;

    let query = `
      SELECT p.*, c.slug as category_slug, c.name as category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (search) {
      const searchTerm = `%${search}%`;
      query += ` AND (p.name LIKE ? OR p.sku LIKE ? OR p.short_desc LIKE ? OR p.tags LIKE ?)`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (category) {
      query += ` AND (c.slug = ? OR c.id = ?)`;
      params.push(category, category);
    }

    if (subcategory) {
      query += ` AND p.subcategory = ?`;
      params.push(subcategory);
    }

    if (inStock === 'true') {
      query += ` AND p.stock > 0`;
    }

    if (featured === 'true') {
      query += ` AND p.featured = 1`;
    }

    if (minPrice) {
      query += ` AND p.price_ron >= ?`;
      params.push(Number(minPrice));
    }

    if (maxPrice) {
      query += ` AND p.price_ron <= ?`;
      params.push(Number(maxPrice));
    }

    if (voltage) {
      query += ` AND p.technical_specs LIKE ?`;
      params.push(`%${voltage}%`);
    }

    if (iface) {
      query += ` AND p.technical_specs LIKE ?`;
      params.push(`%${iface}%`);
    }

    // Sorting
    switch (sortBy) {
      case 'price_asc':
        query += ` ORDER BY p.price_ron ASC`;
        break;
      case 'price_desc':
        query += ` ORDER BY p.price_ron DESC`;
        break;
      case 'rating':
        query += ` ORDER BY p.rating DESC, p.review_count DESC`;
        break;
      case 'newest':
        query += ` ORDER BY p.id DESC`;
        break;
      case 'featured':
      default:
        query += ` ORDER BY p.featured DESC, p.rating DESC, p.id ASC`;
        break;
    }

    query += ` LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    const [rows]: any = await pool.query(query, params);

    const formatted = rows.map((p: any) => ({
      ...p,
      price_ron: parseFloat(p.price_ron),
      old_price_ron: p.old_price_ron ? parseFloat(p.old_price_ron) : null,
      rating: parseFloat(p.rating),
      featured: Boolean(p.featured),
      technical_specs: typeof p.technical_specs === 'string' ? JSON.parse(p.technical_specs) : p.technical_specs,
      pinout_info: p.pinout_info ? (typeof p.pinout_info === 'string' ? JSON.parse(p.pinout_info) : p.pinout_info) : null,
      tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags,
      compatible_with: p.compatible_with ? (typeof p.compatible_with === 'string' ? JSON.parse(p.compatible_with) : p.compatible_with) : []
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:slugOrId - Single product with accessories
productsRouter.get('/products/:slugOrId', async (req: Request, res: Response) => {
  try {
    const { slugOrId } = req.params;
    const isId = !isNaN(Number(slugOrId));

    const query = `
      SELECT p.*, c.slug as category_slug, c.name as category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE ${isId ? 'p.id = ?' : 'p.slug = ?'}
      LIMIT 1
    `;
    const [rows]: any = await pool.query(query, [slugOrId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Produsul nu a fost găsit' });
    }

    const raw = rows[0];
    const compatibleSlugs = raw.compatible_with ? (typeof raw.compatible_with === 'string' ? JSON.parse(raw.compatible_with) : raw.compatible_with) : [];

    let compatibleProducts = [];
    if (compatibleSlugs && compatibleSlugs.length > 0) {
      const placeholders = compatibleSlugs.map(() => '?').join(',');
      const [compRows]: any = await pool.query(
        `SELECT id, slug, name, sku, price_ron, old_price_ron, image_url, stock_status, rating 
         FROM products WHERE slug IN (${placeholders})`,
        compatibleSlugs
      );
      compatibleProducts = compRows.map((cp: any) => ({
        ...cp,
        price_ron: parseFloat(cp.price_ron),
        old_price_ron: cp.old_price_ron ? parseFloat(cp.old_price_ron) : null,
        rating: parseFloat(cp.rating)
      }));
    }

    const product = {
      ...raw,
      price_ron: parseFloat(raw.price_ron),
      old_price_ron: raw.old_price_ron ? parseFloat(raw.old_price_ron) : null,
      rating: parseFloat(raw.rating),
      featured: Boolean(raw.featured),
      technical_specs: typeof raw.technical_specs === 'string' ? JSON.parse(raw.technical_specs) : raw.technical_specs,
      pinout_info: raw.pinout_info ? (typeof raw.pinout_info === 'string' ? JSON.parse(raw.pinout_info) : raw.pinout_info) : null,
      tags: typeof raw.tags === 'string' ? JSON.parse(raw.tags) : raw.tags,
      compatible_products: compatibleProducts
    };

    res.json(product);
  } catch (error) {
    console.error('Error fetching single product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});
