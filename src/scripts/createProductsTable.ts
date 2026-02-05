import { db } from "../config/db";

async function run() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255),
      description TEXT,
      category VARCHAR(100),
      price DECIMAL(10,2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      INDEX idx_category_price (category, price),
      INDEX idx_created_at (created_at),
      INDEX idx_name (name)
    )
  `);

  console.log("✅ products table created");
  process.exit();
}

run();
