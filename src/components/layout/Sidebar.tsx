/* eslint-disable @typescript-eslint/no-explicit-any */

import { Drawer, Box, IconButton, Divider, List } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import ListAltIcon from "@mui/icons-material/ListAlt";
import styles from "./Style.module.scss";
import SidebarItem from "app/global/ui/02_molecules/sidebarItem";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  router: any;
}

export default function Sidebar({ open, setOpen, isMobile, router }: SidebarProps) {
  const handleDrawerClose = () => setOpen(false);

  const isActiveRoute = (route: string) => {
    return router.pathname === route;
  };

  return (
    <Drawer
      className={styles.drawer}
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
      classes={{ paper: styles.drawerPaper }}
    >
      <Box role="presentation" onClick={handleDrawerClose}>
        <div className={styles.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* Ítem para Inicio */}
          <SidebarItem
            icon={<HomeIcon />}
            text="Inicio"
            route="/dashboard"
            isActive={isActiveRoute("/dashboard")}
            onClick={handleDrawerClose}
          />

          {/* Ítem para Tipos */}
          <SidebarItem
            icon={<CategoryIcon />}
            text="Tipos"
            route="/availabilityType"
            isActive={isActiveRoute("/availabilityType")}
            onClick={handleDrawerClose}
          />

          {/* Ítem para Propiedades */}
          <SidebarItem
            icon={<ListAltIcon />}
            text="Propiedades"
            route="/propertyList"
            isActive={isActiveRoute("/propertyList")}
            onClick={handleDrawerClose}
          />
        </List>
      </Box>
    </Drawer>
  );
}