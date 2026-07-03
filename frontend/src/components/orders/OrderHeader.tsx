import { OrderHeader as OrderHeaderType } from "../../types/order";

interface Props {
  order: OrderHeaderType;
}

export const OrderHeader: React.FC<Props> = ({ order }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
      }}
    >
      <h2>Orden #{order.id}</h2>
      <p>Cliente: {order.customerId}</p>
      <p>Estado: {order.status}</p>
      <p>Total: {order.total}</p>
      <p>Notas: {order.notes}</p>
    </div>
  );
};
