import "app/global/ui-kit.scss";
import type { Metadata } from "next";
import { AuthProvider } from "app/shared/context/AuthProvider";
import StoreProvider from "./StoreProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import LinearProgress from "@mui/material/LinearProgress";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      <html lang="es">
        <StoreProvider>
          <AppRouterCacheProvider>
            <body>
              <Suspense fallback={<LinearProgress />}>
                <div>{children}</div>
              </Suspense>
            </body>
          </AppRouterCacheProvider>
        </StoreProvider>
      </html>
    </AuthProvider>
  );
}
