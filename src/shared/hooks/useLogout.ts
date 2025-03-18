import { signOut } from 'next-auth/react';
const useLogout = () => {

	const logout = async () => {
		
		signOut({ callbackUrl: '/login', redirect: true });
	};
	return { logout };
};

export default useLogout;
