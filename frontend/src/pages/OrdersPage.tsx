import { OrderEntryScreen } from "../components/OrderEntryScreen";

export default function OrdersPage() {
  return (
    <div>
      <h1>Orders</h1>

      <p>Aquí irá la tabla y formulario de órdenes.</p>

      <OrderEntryScreen
        orderId="10000000-0000-0000-0000-000000000001"
        customerId="10000000-0000-0000-0000-000000000001"
      />
    </div>
  );
}
