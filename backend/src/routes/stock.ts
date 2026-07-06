import { Router, Request, Response } from "express";
import { handleCheckStock } from "../queries/check-stock/CheckStockHandler";

const router = Router();

router.post("/check", async (req: Request, res: Response) => {
  try {
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    const result = await handleCheckStock(items);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
