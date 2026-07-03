import { Link } from "react-router-dom";
import CustomersTable from "../components/customers/CustomersTable";
import { useCustomers } from "../hooks/useCustomers";

export default function CustomersPage() {
  const { data: customers, isLoading, isError, error } = useCustomers();

  if (isLoading) return <p>Cargando Clientes ...</p>;

  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <div>
      <h1>Clientes</h1>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link to="/customers/new">Agregar</Link>
      </nav>

      <CustomersTable data={customers ?? []} />
    </div>
  );
}
