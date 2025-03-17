import useLoginStorage from 'app/domain/application/client/useLoginStorage';
import { validatePassword } from 'app/shared/utils/validations';

const useValidationLogin = () => {
	const { getLogin, setLogin } = useLoginStorage();
	const data = getLogin();
	const dataForm = getLogin().formData;

	const checkPassword = () => {
		
		const isValid: boolean = validatePassword(dataForm.password);

		setLogin({
			...data,
			formData: { ...dataForm, isValidPassword: isValid },
		});
		return isValid;
	};

	const validateAll = () => {
		const isValidPassword = checkPassword();
		setLogin({
			...data,
			formData: {
				...dataForm,
				isValidPassword,
			},
		});
	};

	return { checkPassword, validateAll };
};

export default useValidationLogin;
