import CustomersTable from "../components/customers/CustomersTable";
import { useCustomers } from "../hooks/useCustomers";

export default function CustomersPage() {
  const { data: customers, isLoading, isError, error } = useCustomers();

  if (isLoading) return <p>Cargando Clientes ...</p>;

  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <div>
      <h1>Clientes</h1>

      <CustomersTable data={customers ?? []} />
    </div>
  );
}
