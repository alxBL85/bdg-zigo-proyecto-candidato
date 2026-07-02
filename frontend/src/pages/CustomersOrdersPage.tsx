import { useParams } from "react-router-dom";
import CustomersOrderTable from "../components/orders/CustomerOrdersTable";
import { useCustomerOrders } from "../hooks/useCustomerOrders";

export default function CustomerOrdersPage() {
  const { id } = useParams();
  const {
    data: customerOrders,
    isLoading,
    isError,
    error,
  } = useCustomerOrders(id ?? "");

  if (isLoading) return <p>Cargando Órdenes ...</p>;

  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <div>
      <h1>Órdenes del Cliente {id}</h1>

      <CustomersOrderTable data={customerOrders ?? []} />
    </div>
  );
}
