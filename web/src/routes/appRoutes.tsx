import { createBrowserRouter } from "react-router-dom";

import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import Dashboard from "../pages/(painel)/Dashboard";
import Products from "../pages/(painel)/Products";
import NewProduct from "../pages/(painel)/Products/NewProduct";
import EditProduct from "../pages/(painel)/Products/EditProduct";
import Sales from "../pages/(painel)/Sales";
import Private from "./Private";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <Private>
        <Dashboard />
      </Private>
    ),
  },
  {
    path: "/products",
    element: (
      <Private>
        <Products />
      </Private>
    ),
  },
  {
    path: "/new-product",
    element: (
      <Private>
        <NewProduct />
      </Private>
    ),
  },
  {
    path: "/edit-product/:productId",
    element: (
      <Private>
        <EditProduct />
      </Private>
    ),
  },
  {
    path: "/sales",
    element: (
      <Private>
        <Sales />
      </Private>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export { router };
