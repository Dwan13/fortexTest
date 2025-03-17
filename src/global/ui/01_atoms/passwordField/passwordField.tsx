/* eslint-disable @typescript-eslint/no-explicit-any */
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type IpasswordField = {
  /**
   * The event handler for the click event.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * The event handler for the mouse down event.
   */
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Set password visible.
   */
  showPassword?: boolean;

  /**
   * Include a label for the passwordField component.
   */
  label?: string;

  /**
   * The value of the passwordField element.
   */
  value?: any;

  /**
   * The change event handler for the passwordField element.
   */
  onChange?: any;

  	/**
	 * The blur event handler for the passwordField element.
	 */
	onBlur?: any;

  /**
   * Additional CSS class name for the passwordField component.
   */
  className?: string;

  /**
   * The status of the passwordField.
   */
  status?: "success" | "warning" | "info" | "error";
};

const PasswordField = ({
  onClick,
  onMouseDown,
  onChange,
  onBlur,
  value,
  label,
  showPassword,
  className,
  status,
}: IpasswordField) => {
  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined" color={status} className={className}>
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        {label}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name="password"
        size="small"
        value={value}
        required
        onChange={onChange}
        onBlur={onBlur}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onClick}
              onMouseDown={onMouseDown}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {status === "error" && (
        <FormHelperText>
          la contraseña debe tener al menos 6 caracteres de solo letras, números
          y alguno de estos caracteres especiales @$!%*#?&
        </FormHelperText>
      )}
    </FormControl>
  );
};
export { PasswordField };
