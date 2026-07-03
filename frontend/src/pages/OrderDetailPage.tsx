import { Link, useParams } from "react-router-dom";
import OrderDetailTable from "../components/orders/OrderDetailTable";
import { OrderHeader } from "../components/orders/OrderHeader";
import { useOrder } from "../hooks/useOrders";
import { OrderHeader as OrderHeaderType } from "../types/order";

export default function OrderDetailPage() {
  const { id: orderId } = useParams();
  const { data: order, isLoading, isError, error } = useOrder(orderId!);

  if (isLoading) return <p>Cargando Orden ...</p>;

  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <div>
      <OrderHeader order={order as OrderHeaderType} />

      <nav
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link to={`/order/${orderId}/add`}>Agregar Item</Link>
      </nav>

      <OrderDetailTable data={order?.items} />
    </div>
  );
}
