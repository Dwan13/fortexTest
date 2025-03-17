import { Poppins } from 'next/font/google';
import React from 'react';
import { Spinner } from 'app/global/ui/01_atoms/spinner';
import Styled from './Style.module.scss';
import Button from '@mui/material/Button';

const poppins = Poppins({
	weight: ['600'],
	subsets: ['latin'],
	style: ['normal'],
	display: 'swap',
});

type IButton = {
	/** */
	isSubmit: boolean;

	/**
	 * The content of the button.
	 */
	children: React.ReactNode;

	/**
	 * The unique identifier of the button.
	 */
	id?: string;

	/**
	 * Determines if the button should be disabled.
	 */
	disabled?: boolean;

	/**
	 * Determines if the button should display a loading state.
	 */
	loading?: boolean;

	/**
	 * The CSS class name for the button.
	 */
	className?: string;

	/**
	 * A ref to the button element.
	 */
	ref?: React.Ref<HTMLButtonElement>;

	/**
	 * The event handler for the click event.
	 */
	onClick?: React.MouseEventHandler<HTMLButtonElement>;

	/**
	 * The event handler for the mouse over event.
	 */
	onMouseOver?: React.MouseEventHandler<HTMLButtonElement>;

	/**
	 * The event handler for the mouse out event.
	 */
	onMouseOut?: React.MouseEventHandler<HTMLButtonElement>;

	/**
	 * The event handler for the mouse up event.
	 */
	onMouseUp?: React.MouseEventHandler<HTMLButtonElement>;

	/**
	 * The event handler for the mouse enter event.
	 */
	onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;

	/**
	 * The event handler for the mouse leave event.
	 */
	onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
};

/**
 * ### ButtonPrimary
 *
 * Use this component to display a primary button on your page.
 *
 * @param small - Determines if the button should have a small size.
 * @param loading - Determines if the button should display a loading state.
 * @param responsive - Determines if the button should be responsive.
 *
 * @example
 * Here's a basic example of how to use the ButtonPrimary:
 * ```tsx
 * <ButtonPrimary onClick={onClick}>Click me</ButtonPrimary>
 * ```
 */
const ButtonPrimary = ({
	id,
	isSubmit = false,
	children,
	disabled,
	loading,
	//functions
	className,
	ref,
	onClick,
	onMouseOver,
	onMouseOut,
	onMouseUp,
	onMouseEnter,
	onMouseLeave,
}: IButton) => {
	const combinedClasses = `
  ${className}
  ${loading ? Styled.pointerEventNone : ''}
  ${poppins.className}
  ${Styled.button}`.trim();
	return (
		<Button
			id={id}
			type={isSubmit ? 'submit' : 'button'}
			//styles
			disabled={disabled}
			//functions
			ref={ref}
			className={combinedClasses}
			onClick={onClick}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			onMouseUp={onMouseUp}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			variant="contained"
		>
			<span className={`${loading ? Styled.label_hide : ''}`}>{children}</span>

			{loading && <Spinner micro className={Styled.spinner} />}
		</Button>
	);
};

export { ButtonPrimary };