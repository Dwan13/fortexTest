export const validatePassword = (_password: string) => {
	const isValid = _password.match(/^[\w@$!%*#?&]{6,}$/) ? true : false;

	return isValid;
};
