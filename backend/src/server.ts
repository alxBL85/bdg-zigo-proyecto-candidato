import express from 'express';
import cors from 'cors';
import ordersRouter from './routes/orders';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/orders', ordersRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Orders service running on port ${PORT}`);
});
