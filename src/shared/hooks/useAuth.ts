import { useContext } from "react";
import { AuthContext } from "app/shared/context/AuthProvider";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
