export const validateFullName = (_name: string) => {
	const isValid = _name.match(/^[a-zA-ZÀ-ÿ']+ [a-zA-ZÀ-ÿ'\s]*$/) ? true : false;

	return isValid;
};
