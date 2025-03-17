import { Divider as MUIDivider } from '@mui/material';
import styledDivider from './Style.module.scss';

type IDivider = {
	readonly size?: 'S' | 'M' | 'L' | 'XL' | 'XXL';
	readonly light?: boolean;
	readonly className?: string;
};

export function Divider({ size = 'M', className, light }: IDivider) {
	const spacing = `var(--spacing-${size})`;

	return (
		<MUIDivider
			className={`${styledDivider.divider} ${className ?? ''} ${light ? styledDivider.light : ''}`.trim()}
			style={{ marginTop: spacing, marginBottom: spacing }}
		/>
	);
}
