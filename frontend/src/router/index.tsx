import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import CustomerOrdersPage from "../pages/CustomersOrdersPage";
import CustomersPage from "../pages/CustomersPage";
import HomePage from "../pages/HomePage";
import OrderDetailPage from "../pages/OrderDetailPage";
import OrdersPage from "../pages/OrdersPage";
import ProductsPage from "../pages/ProductsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      { path: "customers/:id/orders", element: <CustomerOrdersPage /> },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "order/:id",
        element: <OrderDetailPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
    ],
  },
]);
