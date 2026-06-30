import React from 'react';
import { Order } from '../types/order';

interface Props {
  order: Order;
}

export const OrderDetailsCard: React.FC<Props> = ({ order }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, borderRadius: 8, marginBottom: 16 }}>
      <h2>Orden #{order.id}</h2>
      <p>Cliente: {order.customerId}</p>
      <p>Estado: {order.status}</p>
      <h3>Productos en la orden</h3>
      <ul>
        {order.items.map((item) => (
          <li key={item.productId}>
            {item.productName ?? item.productId} x{item.quantity} — ${item.unitPrice}
          </li>
        ))}
      </ul>
      <p><strong>Total: ${order.total}</strong></p>
    </div>
  );
};
