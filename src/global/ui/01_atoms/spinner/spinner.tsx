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
