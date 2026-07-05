import express from "express";
import cors from "cors";
import ordersRouter from "./routes/orders";
import customersRouter from "./routes/customers";
import stockRouter from "./routes/stock";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/orders", ordersRouter);
app.use("/customers", customersRouter);
app.use("/stock", stockRouter);

app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Orders service running on port ${PORT}`);
});
