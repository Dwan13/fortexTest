import Style from './Style.module.scss';

type IContainer = {
	/**
	 * The content of the container.
	 */
	children: React.ReactNode;

	/**
	 * The class name of the container.
	 */
	className?: string;
};

export function Container({ children, className }: IContainer) {
	return (
		<div className={`${className ? className : ''} ${Style.container}`.trim()}>
			{children}
		</div>
	);
}
