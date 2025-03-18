import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Style.module.scss";

interface HeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
}

export default function Header({ open, setOpen, isMobile }: HeaderProps) {
  return (
    <AppBar className={`${!isMobile && open ? styles.appBar : styles.appBarClosed}`} position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(true)}
          edge="start"
          sx={{ mr: 2, ...(open && !isMobile && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
