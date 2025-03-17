/* eslint-disable @typescript-eslint/no-explicit-any */
import TextField from "@mui/material/TextField";
import {
  AccountCircle,
  CheckCircle as CheckCircleIcon,
  Dangerous as DangerousIcon,
  SyncProblem as SyncProblemIcon,
} from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

type ItextFiled = {
  /**
   * The status of the Text Filed.
   */
  status?: 'success' | 'warning' | 'info' | 'error';

  /**
   * Indicates whether the Text Filed is disabled.
   */
  disabled?: boolean;

  /**
   * Additional CSS class name for the Text Filed component.
   */
  className?: string;

  /**
   * Include a label for the Text Filed component.
   */
  label?: string;

  /**
   * The value of the Text Filed element.
   */
  value?: any;

  /**
   * The change event handler for the Text Filed element.
   */
  onChange?: any;
};

/**
 * ### TextField
 *
 * Use this component to display a TextField with a specific status and icon.
 *
 * @param status - The color status of the TextField.
 * @param disabled - The TextField will have a disabled status.
 * @param className - The TextField will have a custom class name.
 * @param label - The label of the TextField.
 *
 * @example
 * Here's a basic example of how to use the TextField:
 * ```tsx
 * <TextField status="success" label="User" />
 * ```
 */

const StatusIcon = ({ status = "action" }: any) => {
  let IconComponent;

  switch (status) {
    case "success":
      IconComponent = CheckCircleIcon;
      break;
    case "warning":
      IconComponent = DangerousIcon;
      break;
    case "error":
      IconComponent = SyncProblemIcon;
      break;
    default:
      IconComponent = AccountCircle;
  }

  return IconComponent ? (
    <IconComponent sx={{ mr: 1, my: 0.5 }} color={status} />
  ) : null;
};

const TextFiled = ({
  status,
  disabled,
  className,
  label,
  value,
  onChange,
}: ItextFiled) => {
  return (
    <TextField
      disabled={disabled}
      value={value}
      onChange={onChange}
      id="input-with-icon-textfield"
      label={label}
      name="email"
      type="text"
      size="small"
      required
      fullWidth
      className={className}
      color={status}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <StatusIcon status={status} />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
    />
  );
};
export { TextFiled };
