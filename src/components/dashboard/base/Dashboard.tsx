/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useAuth } from "app/shared/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ButtonOutline } from "app/global/ui/01_atoms";

export const DashboardPage = () => {
  const { user, logoutUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login"); 
  }, [user, router]);

  if (!user) return null;

  return (
    <div>
      <h1>Bienvenido, {user.username}</h1>
      <p>Tu acceso: {user.isAdmin ? "Administrador" : "Usuario"}</p>
      <ButtonOutline onClick={logoutUser}>Cerrar sesión</ButtonOutline>
    </div>
  );
}
