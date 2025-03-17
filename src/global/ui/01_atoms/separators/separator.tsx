import { Box } from '@mui/material';

type ISeparator = {
	/**
	 * The size of the separator.
	 */
	readonly size: string;

	/**
	 * The additional class name to apply to the separator.
	 */
	readonly className?: string;
};

/**
 * ### Separator
 *
 * Use this component to create a separator.
 *
 * @param size - The size of the separator.
 *
 * @example
 * ```tsx
 * <Separator size="md" />
 * ```
 */
export function Separator({ size, className }: ISeparator) {
	return <Box sx={{ height: `var(--spacing-${size})` }} className={className} />;
}
