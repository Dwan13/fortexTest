"use client";

import * as React from "react";
import { Box, CssBaseline } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./Style.module.scss";

export default function BaseContainerLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh", overflowX: "hidden" }}>
      <CssBaseline />
      <Header open={open} setOpen={setOpen} isMobile={isMobile} />
      <Sidebar open={open} setOpen={setOpen} isMobile={isMobile} router={router} />
      <main className={`${styles.main} ${!isMobile && open ? styles.mainOpen : styles.mainClosed}`}>
        <div className={styles.drawerHeader} />
        {children}
      </main>
    </Box>
  );
}
