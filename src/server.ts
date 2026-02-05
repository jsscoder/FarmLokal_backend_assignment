import "dotenv/config";
import app from "./app";
import { Request, Response } from "express";

const PORT = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "FarmLokal Backend is running 🚀",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: "/metrics",
      products: "/api/products?limit=10",
      productsWithCursor: "/api/products?limit=10&cursor=10",
      productsFilter: "/api/products?category=Electronics&limit=10",
      productsSort: "/api/products?sort=price&limit=10"
    },
    quickTest: "Open /api/products?limit=10 to verify data"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
