import { useContext, useEffect, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Menu from "../components/Menu";

interface PrivateProps {
  children: ReactNode;
}

export default function Private({ children }: PrivateProps) {
  const { signed, userInfo, loading } = useContext(AuthContext);

  useEffect(() => {
    function redirectUser() {
      if (userInfo) {
        return <Navigate to={"/dashboard"} />;
      }
    }

    return () => {
      redirectUser();
    };
  }, [userInfo]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas px-6 text-content">
        <div
          className="flex flex-col items-center gap-4 text-center"
          role="status"
          aria-live="polite"
        >
          <span
            className="h-10 w-10 animate-spin rounded-full border-[3px] border-brand-100 border-t-brand-700"
            aria-hidden="true"
          />
          <div>
            <h1 className="text-base font-semibold">Buscando seus dados</h1>
            <p className="mt-1 text-sm text-content-muted">
              Aguarde enquanto carregamos sua sessão.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!signed) {
    return <Navigate to={"/"} />;
  }

  return (
    <main className="flex flex-row w-full">
      <Menu />

      <div className="flex py-10 px-20">{children}</div>
    </main>
  );
}
