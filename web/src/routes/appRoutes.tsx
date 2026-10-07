import { createBrowserRouter } from "react-router-dom";

import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import Dashboard from "../pages/(painel)/Dashboard";
import Products from "../pages/(painel)/Products";
import NewProduct from "../pages/(painel)/Products/NewProduct";
import Sales from "../pages/(painel)/Sales";

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
    element: <Dashboard />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/new-product",
    element: <NewProduct />,
  },
  {
    path: "/sales",
    element: <Sales />,
  },
]);

export { router };
