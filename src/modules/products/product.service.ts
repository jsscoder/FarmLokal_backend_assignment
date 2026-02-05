import { redis } from "../../config/redis";
import { fetchProducts } from "./product.repo";

export async function getProducts(params: any) {
  const cacheKey = `products:${JSON.stringify(params)}`;

  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const data = await fetchProducts(params);

  await redis.set(cacheKey, JSON.stringify(data), "EX", 30);

  return data;
}
