"use client";
import {TextField} from "@mui/material";

export function SearchField({ value, onChange }) {
  return (
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
    />
  );
}