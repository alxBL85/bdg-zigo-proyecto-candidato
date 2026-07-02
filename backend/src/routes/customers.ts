import { Router, Request, Response } from "express";
import {
  handleGetCustomer,
  handleGetCustomers,
} from "../queries/get-customer/GetCustomerHandler";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const customers = await handleGetCustomers();

    if (!customers)
      return res.status(404).json({ error: "Customers Not found" });

    res.json(customers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const customer = await handleGetCustomer(req.params.id);

    if (!customer) return res.status(404).json({ error: "Customer Not found" });

    res.json(customer);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
