import { useParams } from "react-router-dom";

export default function CustomerOrdersPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Órdenes del Cliente</h1>

      <p>Órdenes del Cliente: {id}</p>
    </div>
  );
}
