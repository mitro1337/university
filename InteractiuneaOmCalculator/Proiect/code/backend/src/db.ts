import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'homelab_ecommerce',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const pool = mysql.createPool(dbConfig);

export async function initDatabase() {
  console.log('Connecting to MySQL database...');
  const conn = await pool.getConnection();
  try {
    console.log('Checking and initializing MySQL schema...');

    // Categories table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(64) UNIQUE NOT NULL,
        name VARCHAR(128) NOT NULL,
        icon VARCHAR(64) NOT NULL,
        description TEXT,
        sort_order INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Products table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(128) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        sku VARCHAR(64) UNIQUE NOT NULL,
        mpn VARCHAR(64),
        category_id INT NOT NULL,
        subcategory VARCHAR(64) NOT NULL,
        price_ron DECIMAL(10, 2) NOT NULL,
        old_price_ron DECIMAL(10, 2) NULL,
        stock INT DEFAULT 0,
        stock_status ENUM('in_stock', 'low_stock', 'out_of_stock') DEFAULT 'in_stock',
        short_desc VARCHAR(1000) NOT NULL,
        full_desc TEXT NOT NULL,
        technical_specs JSON NOT NULL,
        pinout_info JSON NULL,
        datasheet_url VARCHAR(512) NULL,
        image_url VARCHAR(512) NOT NULL,
        badge VARCHAR(64) NULL,
        tags JSON NOT NULL,
        rating DECIMAL(3, 2) DEFAULT 5.0,
        review_count INT DEFAULT 0,
        featured BOOLEAN DEFAULT FALSE,
        compatible_with JSON NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_category (category_id),
        INDEX idx_stock (stock_status),
        INDEX idx_price (price_ron)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Orders table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(64) UNIQUE NOT NULL,
        guest_name VARCHAR(128) NOT NULL,
        guest_email VARCHAR(128) NOT NULL,
        guest_phone VARCHAR(32) NOT NULL,
        shipping_address VARCHAR(255) NOT NULL,
        city VARCHAR(64) NOT NULL,
        county VARCHAR(64) NOT NULL,
        postal_code VARCHAR(16) NULL,
        delivery_method ENUM('curier_sameday', 'easybox', 'ridicare_bucuresti') NOT NULL,
        notes TEXT NULL,
        subtotal_ron DECIMAL(10, 2) NOT NULL,
        shipping_ron DECIMAL(10, 2) NOT NULL,
        total_ron DECIMAL(10, 2) NOT NULL,
        status ENUM('pending_payment', 'paid', 'processing', 'shipped', 'cancelled', 'failed') DEFAULT 'pending_payment',
        payment_method VARCHAR(32) NOT NULL DEFAULT 'stripe_card',
        netopia_transaction_id VARCHAR(128) NULL,
        netopia_auth_code VARCHAR(128) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_order_number (order_number),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Order Items table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        sku VARCHAR(64) NOT NULL,
        unit_price_ron DECIMAL(10, 2) NOT NULL,
        quantity INT NOT NULL,
        subtotal_ron DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        INDEX idx_order_id (order_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Payment Transactions table (audit log)
    await conn.query(`
      CREATE TABLE IF NOT EXISTS payment_transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        netopia_order_id VARCHAR(128) NOT NULL,
        amount_ron DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(8) DEFAULT 'RON',
        status VARCHAR(32) DEFAULT 'initiated',
        error_message VARCHAR(255) NULL,
        raw_ipn_data JSON NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_netopia_order (netopia_order_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('MySQL schema tables verified.');
  } finally {
    conn.release();
  }
}
