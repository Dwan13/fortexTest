import { CircularProgress } from '@mui/material';
import Style from './Style.module.scss';

type ISpinner = {
	/**
	 * Determines if the spinner should be displayed in micro size.
	 */
	readonly micro?: boolean;

	/**
	 * Determines if the spinner should be displayed in small size.
	 */
	readonly small?: boolean;

	/**
	 * Specifies the color of the spinner.
	 */
	readonly color?: string;

	/**
	 * Specifies additional CSS classes for the spinner.
	 */
	readonly className?: string;
};

/**
 * ### Spinner
 *
 * Use this component to indicate that a process is running. You can choose the size and color of the spinner.
 *
 * @param micro - The spinner will be very small.
 * @param small - The spinner will be small.
 * @param color - The color of the spinner.
 *
 * @example
 * Here's a basic example of how to use the Spinner:
 * ```tsx
 * <Spinner micro />
 * ```
 */
export function Spinner({ micro, small, className, color }: ISpinner) {
	const size = micro ? 16 : small ? 24 : 40;

	return (
		<CircularProgress 
			className={className ? `${className} ${Style.spinner}` : Style.spinner}
			size={size} 
			style={{ color }}
		/>
	);
}
