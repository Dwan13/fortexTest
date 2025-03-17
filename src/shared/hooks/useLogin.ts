/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import useLoginStorage from 'app/domain/application/client/useLoginStorage';
import {
	setData,
	deleteCredentialCookie,
} from 'app/domain/application/server/rememberme';
import { useAuth } from "app/shared/hooks/useAuth";
import { useRouter } from "next/navigation";

const useLogin = () => {
	const { loginUser } = useAuth();
	const router = useRouter();

	const { getLogin, setLogin } = useLoginStorage();
	const data = getLogin();
	const formData = getLogin().formData;

	const login = async (_username?: string, _pass?: string) => {
		
		const loginData = {
			username: formData.username,
			password: formData.password,
			redirect: false,
		};
		if (_username && _pass) {
			loginData.username = _username;
			loginData.password = _pass;
		}

		setLogin({
			...data,
			loading: true,
		});
		try {
			await loginUser(loginData.username, loginData.password);
			if (formData.rememberMe) {
				await setData(formData.username, formData.password);
			} else {
				await deleteCredentialCookie();
			}
			setLogin({
				...data,
				loading: false,
			});
			router.push("/dashboard");
		} catch (err) {
			console.log('Login failed');
			setLogin({
				...data,
				userIncorrect: true,
				loading: false,
			});
		}
	};
	return { login };
};

export default useLogin;
