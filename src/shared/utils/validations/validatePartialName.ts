export const validatePartialName = (partialName: string) => {
	const isValid = partialName.match(
		/^[a-zA-ZÀ-ÿ']{1,50}(?:[-' ][a-zA-ZÀ-ÿ']{1,50})*$/,
	);
	return isValid !== null;
};
