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
  Button,
  Drawer,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { IProperty } from "app/domain/application/interfaces/IProperty";
import { usePropertiesApi } from "app/shared/hooks/useMockApiProperties";

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
      alert("Name and Type are required");
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
      <TextField
        label="Search Properties"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpenDrawer()}
      >
        Add Property
      </Button>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
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
          />
        </TableContainer>
      )}
      <Drawer anchor="top" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width: "100%", p: 3 }}>
          <Typography variant="h6">
            {editingProperty?.id ? "Edit Property" : "New Property"}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={editingProperty?.name || ""}
            onChange={(e) =>
              setEditingProperty(
                (prev) => prev && { ...prev, name: e.target.value }
              )
            }
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              value={editingProperty?.type || "texto"} // Asegura un valor válido por defecto
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveProperty}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCloseDrawer}
            sx={{ marginLeft: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
