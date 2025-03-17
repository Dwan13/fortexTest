import Style from './Style.module.scss';

type IBox = {
	/**
	 * The content of the box.
	 */
	children: React.ReactNode;
	/**
	 * If true, the box will have a shadow.
	 */
	shadow?: boolean;
	/**
	 * The id of the box.
	 */
	id?: string;
	/**
	 * If true, the box will be displayed inline.
	 */
	inline?: boolean;
	/**
	 * The padding type of the box. You can choose between 'default', 'micro', 'small', 'medium', 'large', 'xLarge' and 'xxLarge'.
	 */
	type?:
		| 'default'
		| 'micro'
		| 'small'
		| 'medium'
		| 'large'
		| 'xLarge'
		| 'xxLarge';
	/**
	 * The class name of the box.
	 */
	className?: string;
	/**
	 * Event function that will be executed when the box is clicked.
	 */
	onClick?: () => void;
};

/**
 * ### Box
 *
 * Use this component to wrap the content of your page. It will wrap the content in a box with a shadow.
 *
 * @param type - The padding type of the box. You can choose between 'default', 'micro', 'small', 'medium', 'large', 'xLarge' and 'xxLarge'.
 *
 * @example
 * Here's a basic example of how to use the Box:
 * ```tsx
 * <Box type='large'>
 * 	Your code...
 * </Box>
 * ```
 */
const Box = ({
	children,
	type,
	className,
	inline,
	shadow = true,
	onClick,
}: IBox) => {
	return (
		<div
			className={`
        ${className ? className : ''}
        ${Style.box}
        ${inline ? Style.inline : ''}
        ${shadow ? Style.shadow : ''}
        ${type ? Style['box-' + type] : ''}`.trim()}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export { Box };
