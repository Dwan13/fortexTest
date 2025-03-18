import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link"; 
import styles from "./Style.module.scss"; 

interface SidebarItemProps {
  icon: React.ReactNode; 
  text: string; 
  route: string; 
  isActive: boolean; 
  onClick?: () => void; 
}

export default function SidebarItem({ icon, text, route, isActive, onClick }: SidebarItemProps) {
  return (
    <ListItem disablePadding>
      <Link href={route} passHref legacyBehavior>
        <ListItemButton
          className={`${styles.listItemButton} ${isActive ? styles.active : ""}`}
          onClick={onClick}
        >
          <ListItemIcon className={styles.listItemIcon}>{icon}</ListItemIcon>
          <ListItemText primary={text} className={styles.listItemText} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
}