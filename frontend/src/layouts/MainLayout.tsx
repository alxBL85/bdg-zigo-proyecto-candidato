import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <header
        style={{
          padding: "1rem",
          borderBottom: "1px solid #ccc",
          marginBottom: "2rem",
        }}
      >
        <nav
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/customers">Clientes</Link>
          <Link to="/orders">Ordenes</Link>
          <Link to="/products">Productos</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
