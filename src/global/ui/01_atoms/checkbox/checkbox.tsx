'use client';

import { Checkbox as MUICheckbox } from '@mui/material';
import Style from './Style.module.scss';

type ICheckbox = {
	id?: string;
	label?: string;
	name?: string;
	checked?: boolean;
	defaultChecked?: boolean;
	disabled?: boolean;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
};

export function Checkbox({
	id,
	label,
	className,
	disabled,
	defaultChecked,
	checked,
	name,
	onChange,
}: ICheckbox) {
	return (
		<label className={`${className} ${disabled ? Style.disabled : ''} ${Style.label}`.trim()}>
			<MUICheckbox
				id={id}
				name={name}
				checked={checked}
				defaultChecked={defaultChecked}
				disabled={disabled}
				onChange={onChange}
				classes={{ root: Style.input, checked: Style.checked }}
			/>
			<span className={Style.body}></span>
			<span className={Style.labelText}>{label}</span>
		</label>
	);
}