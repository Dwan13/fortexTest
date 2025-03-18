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
import { IType } from "app/domain/application/interfaces/IType";
import { mockProperties } from "./mockProperties";
import { useTypesApi } from "app/shared/hooks/useMockApiTypes";
import { usePropertiesApi } from "app/shared/hooks/useMockApiProperties";
import { Spinner, SearchField, ButtonPrimary, ButtonOutline } from "app/global/ui/01_atoms";
import Utils from "app/global/utilities/utils.module.scss";
export default function TypesTable() {
  const { types, loading, addType, updateType, deleteType } = useTypesApi();
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editingType, setEditingType] = React.useState<IType | null>(null);
  const { properties } = usePropertiesApi();
  const newProperties = properties ? properties : mockProperties;
  const handleOpenDrawer = (type?: IType) => {
    setEditingType(
      type || {
        id: 0,
        name: "",
        description: "",
        properties: [],
        createdAt: new Date().toISOString().split("T")[0],
      }
    );
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditingType(null);
  };

  const handleSaveType = () => {
    if (!editingType?.name) {
      alert("El nombre es requerido");
      return;
    }

    if (editingType.id && types.some((t) => t.id === editingType.id)) {
      updateType(editingType).then(() => handleCloseDrawer());
    } else {
      addType({ ...editingType, id: Date.now() }).then(() =>
        handleCloseDrawer()
      );
    }
  };

  const filteredTypes = types.filter((type) =>
    type.name.toLowerCase().includes(search.toLowerCase())
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
        Agregar tipo
      </ButtonPrimary>
      {loading ? (
        <Spinner className={`${Utils.d_block} ${Utils.m_L}`} />
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Propiedades</TableCell>
                <TableCell>Creado en</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTypes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((type) => (
                  <TableRow key={type.id}>
                    <TableCell>{type.name}</TableCell>
                    <TableCell>{type.description}</TableCell>
                    <TableCell>{type.properties.join(", ")}</TableCell>
                    <TableCell>{type.createdAt}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDrawer(type)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => deleteType(type.id)}
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
            count={filteredTypes.length}
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
            {editingType?.id ? "Editar tipo" : "Nuevo tipo"}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            value={editingType?.name || ""}
            onChange={(e) =>
              setEditingType(
                (prev) => prev && { ...prev, name: e.target.value }
              )
            }
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Descripción"
            value={editingType?.description || ""}
            onChange={(e) =>
              setEditingType(
                (prev) => prev && { ...prev, description: e.target.value }
              )
            }
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Propiedades</InputLabel>
            <Select
              multiple
              value={editingType?.properties || []}
              input={<OutlinedInput label="Propiedades" />}
              onChange={(e) =>
                setEditingType((prev) =>
                  prev
                    ? { ...prev, properties: e.target.value as string[] }
                    : null
                )
              }
            >
              {newProperties.map((prop) => (
                <MenuItem key={prop.id} value={prop.name}>
                  {prop.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className={`${Utils.d_flex} ${Utils.gap_L}`}>
            <ButtonPrimary onClick={handleSaveType}>
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