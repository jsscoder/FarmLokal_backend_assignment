import { db } from "../config/db";
import { faker } from "@faker-js/faker";

const TOTAL = 100_000; // start with 100k (safe for Neon)
const BATCH = 1000;

async function seed() {
  for (let i = 0; i < TOTAL; i++) {
    const name = faker.commerce.productName();
    const desc = faker.commerce.productDescription();
    const category = faker.commerce.department();
    const price = faker.number.float({ min: 10, max: 500 });

    await db.query(
      `INSERT INTO products (name, description, category, price)
       VALUES ($1, $2, $3, $4)`,
      [name, desc, category, price]
    );

    if (i % 1000 === 0) {
      console.log(`Inserted ${i}/${TOTAL}`);
    }
  }

  console.log("✅ Seeding complete");
  process.exit();
}

seed();
