import { RouterProvider } from "react-router-dom";

import AuthProvider from "./contexts/AuthContext";

import { router } from "./routes/appRoutes";

import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        autoClose={2500}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        position="top-right"
        hideProgressBar
      />
    </AuthProvider>
  );
}
