import { useState } from "react";
import { useParams } from "react-router-dom";
import CreateOrderModal from "../components/orders/CreateOrderModal";
import CustomersOrderTable from "../components/orders/CustomerOrdersTable";
import { useCustomerOrders } from "../hooks/useCustomerOrders";

export default function CustomerOrdersPage() {
  const { id } = useParams();
  const customerId = id ?? "";

  const {
    data: customerOrders,
    isLoading,
    isError,
    error,
  } = useCustomerOrders(customerId);

  const [openModal, setOpenModal] = useState(false);

  if (isLoading) return <p>Cargando Órdenes ...</p>;

  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <div>
      <h1>Órdenes del Cliente {id}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <button onClick={() => setOpenModal(true)}>Agregar Orden</button>
      </div>

      <CustomersOrderTable data={customerOrders ?? []} />

      {openModal && (
        <CreateOrderModal
          customerId={customerId}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}
