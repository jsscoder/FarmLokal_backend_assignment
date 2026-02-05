import { Router } from "express";
import { webhookHandler } from "./modules/webhooks/webhook.controller"
;
import { listProducts } from "./modules/products/product.controller"
const router = Router();

router.post("/webhook", webhookHandler);
router.get("/products", listProducts);
export default router;
