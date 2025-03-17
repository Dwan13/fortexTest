'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getData } from 'app/domain/application/server/rememberme';
import useLoginStorage from 'app/domain/application/client/useLoginStorage';

const useCheckLoginStatus = () => {
	const { status } = useSession();
	const router = useRouter();
	const { setLogin, getLogin } = useLoginStorage();
	const loginStorage = getLogin();
	const flag = useRef(false);

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/dashboard');
		} else {
			checkRememberMe();
		}
	}, [status]);

	const checkRememberMe = async () => {
		if (flag.current) return; // Evita múltiples ejecuciones
		flag.current = true;

		const credentials = await getData();

		if (credentials) {
			setLogin({
				...loginStorage,
				formData: {
					...loginStorage.formData,
					username: credentials.username, // Cambio de email a username
					password: credentials.pass,
					rememberMe: true,
				},
			});
		}
	};
};

export default useCheckLoginStatus;
