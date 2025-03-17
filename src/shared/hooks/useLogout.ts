import { signOut } from 'next-auth/react';
import logoutSession from 'app/infrastructure/externals/logout';
import getClientSession from 'app/domain/application/client/getClientSession';
const useLogout = () => {
	const session = getClientSession();

	const logout = async () => {
		if (session) {
			await logoutSession(session.validity.token);
		}
		signOut({ callbackUrl: '/login', redirect: true });
	};
	return { logout };
};

export default useLogout;
