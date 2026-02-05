import { Request, Response } from "express";
import { getProducts } from "./product.service";

export async function listProducts(req: Request, res: Response) {
  const {
    cursor,
    limit = 20,
    category,
    minPrice,
    maxPrice,
    sort
  } = req.query;

  const data = await getProducts({
    cursor: cursor ? Number(cursor) : null,
    limit: Number(limit),
    category,
    minPrice,
    maxPrice,
    sort
  });

  const nextCursor = data.length ? data[data.length - 1].id : null;

  res.json({ data, nextCursor });
}
