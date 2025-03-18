"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  TablePagination,
  Drawer,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { IProperty } from "app/domain/application/interfaces/IProperty";
import { usePropertiesApi } from "app/shared/hooks/useMockApiProperties";
import { Spinner, SearchField, ButtonPrimary, ButtonOutline } from "app/global/ui/01_atoms";
import Utils from "app/global/utilities/utils.module.scss";

export default function PropertyTable() {
  const { properties, loading, addProperty, updateProperty, deleteProperty } =
    usePropertiesApi();
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editingProperty, setEditingProperty] =
    React.useState<IProperty | null>(null);

  const handleOpenDrawer = (property?: IProperty) => {
    setEditingProperty(
      property || {
        id: Date.now(),
        name: "",
        type: "texto",
        createdAt: new Date().toISOString().split("T")[0],
      }
    );
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditingProperty(null);
  };

  const handleSaveProperty = () => {
    if (!editingProperty?.name || !editingProperty?.type) {
      alert("El nombre y el tipo son requeridos");
      return;
    }

    if (
      editingProperty.id &&
      properties.some((p) => p.id === editingProperty.id)
    ) {
      updateProperty(editingProperty).then(() => handleCloseDrawer());
    } else {
      addProperty({ ...editingProperty, id: Date.now() }).then(() =>
        handleCloseDrawer()
      );
    }
  };

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SearchField
        value={search}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setSearch(e.target.value)
        }
      />
      <ButtonPrimary
        startIcon={<AddIcon />}
        onClick={() => handleOpenDrawer()}
      >
        Agregar propiedad
      </ButtonPrimary>
      {loading ? (
        <Spinner className={`${Utils.d_block} ${Utils.m_L}`} />
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Creado en</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProperties
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>{property.name}</TableCell>
                    <TableCell>{property.type}</TableCell>
                    <TableCell>{property.createdAt}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDrawer(property)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => deleteProperty(property.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredProperties.length}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            labelRowsPerPage="Filas por página:"
            sx={{
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                margin: 0, 
                padding: 0, 
              },
              "& .MuiTablePagination-toolbar": {
                padding: 0, 
              },
            }}
          />
        </TableContainer>
      )}
      <Drawer anchor="top" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width: "100%", p: 3 }}>
          <Typography variant="h6">
            {editingProperty?.id ? "Editar propiedad" : "Nueva propiedad"}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            value={editingProperty?.name || ""}
            onChange={(e) =>
              setEditingProperty(
                (prev) => prev && { ...prev, name: e.target.value }
              )
            }
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo</InputLabel>
            <Select
              value={editingProperty?.type || "texto"}
              input={<OutlinedInput label="Tipo" />}
              onChange={(e) =>
                setEditingProperty((prev) =>
                  prev
                    ? { ...prev, type: e.target.value as IProperty["type"] }
                    : null
                )
              }
            >
              <MenuItem value="texto">Texto</MenuItem>
              <MenuItem value="número">Número</MenuItem>
              <MenuItem value="fecha">Fecha</MenuItem>
              <MenuItem value="check">Check</MenuItem>
            </Select>
          </FormControl>
          <div className={`${Utils.d_flex} ${Utils.gap_L}`}>
            <ButtonPrimary
              onClick={handleSaveProperty}
            >
              Guardar
            </ButtonPrimary>
            <ButtonOutline
              onClick={handleCloseDrawer}
            >
              Cancelar
            </ButtonOutline>
          </div>

        </Box>
      </Drawer>
    </>
  );
}