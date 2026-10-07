import { createContext, type ReactNode } from "react";

interface AuthContextProps {
  name: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const name = "Marcio";

  return (
    <AuthContext.Provider value={{ name }}>{children}</AuthContext.Provider>
  );
}
