import { db } from "../../config/db";

export async function fetchProducts({
  limit,
  cursor,
  category,
  minPrice,
  maxPrice,
  sort
}: any) {
  let query = `SELECT * FROM products WHERE 1=1`;
  const params: any[] = [];
  let idx = 1;

  if (cursor) {
    query += ` AND id > $${idx++}`;
    params.push(cursor);
  }

  if (category) {
    query += ` AND category = $${idx++}`;
    params.push(category);
  }

  if (minPrice) {
    query += ` AND price >= $${idx++}`;
    params.push(minPrice);
  }

  if (maxPrice) {
    query += ` AND price <= $${idx++}`;
    params.push(maxPrice);
  }

  if (sort === "price") query += ` ORDER BY price`;
  else if (sort === "name") query += ` ORDER BY name`;
  else query += ` ORDER BY id`;

  query += ` LIMIT $${idx}`;
  params.push(limit);

  const { rows } = await db.query(query, params);
  return rows;
}
