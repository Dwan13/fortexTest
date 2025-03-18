/* eslint-disable @typescript-eslint/no-explicit-any */
import {TextField} from "@mui/material";
type ISeparator = {
  value: string,
  onChange: any;
}
export function SearchField({ value, onChange }: ISeparator) {
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