import React from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

interface DynamicDrawerProps {
  open: boolean;
  isTypesPage: boolean;
  formData: { name: string; description?: string; type?: string };
  handleClose: () => void;
  handleInputChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  handleSave: () => void;
}

const DynamicDrawer: React.FC<DynamicDrawerProps> = ({
  open,
  isTypesPage,
  formData,
  handleClose,
  handleInputChange,
  handleSave,
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box sx={{ width: 300, p: 2 }}>
        <Typography variant="h6">{isTypesPage ? "Nuevo Tipo" : "Nueva Propiedad"}</Typography>
        <TextField
          label="Nombre"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleInputChange}
        />
        {isTypesPage ? (
          <TextField
            label="Descripción"
            name="description"
            fullWidth
            margin="normal"
            value={formData.description || ""}
            onChange={handleInputChange}
          />
        ) : (
            <Select
            label="Tipo de Propiedad"
            name="type"
            fullWidth
            value={formData.type}
            onChange={(event) => handleInputChange(event as unknown as React.ChangeEvent<HTMLInputElement>)}
            >
            <MenuItem value="text">Texto</MenuItem>
            <MenuItem value="number">Número</MenuItem>
            <MenuItem value="date">Fecha</MenuItem>
            <MenuItem value="checkbox">Check</MenuItem>
          </Select>
          
        )}
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSave}>
          Guardar
        </Button>
      </Box>
    </Drawer>
  );
};

export default DynamicDrawer;
