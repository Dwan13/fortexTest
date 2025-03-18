/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useAuth } from "app/shared/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Card, CardContent, Container, Typography, Box } from "@mui/material";
import { ButtonOutline } from "app/global/ui/01_atoms";

export const DashboardPage = () => {
  const { user, logoutUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login"); 
  }, [user, router]);

  if (!user) return null;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ p: 3, textAlign: "center", boxShadow: 3 }}>
        <Avatar sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}>
          {user.username.charAt(0).toUpperCase()}
        </Avatar>
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            Bienvenido, {user.username}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            Acceso: {user.isAdmin ? "Administrador" : "Usuario"}
          </Typography>
          <Box>
            <ButtonOutline 
              onClick={logoutUser}
            >
              Cerrar sesión
            </ButtonOutline>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
