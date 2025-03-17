/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from 'app/shared/lib/hooks';

import { reducerLoginData } from 'app/infrastructure/persistence/redux/loginSlice';

import { ILoginStorageData } from 'app/domain/application/interfaces/ILoginStorage';

const useLoginRepository = () => {
	const dispatch = useAppDispatch();
	const login = useAppSelector((state: { login: any; }) => state.login);

	const getDataRepository = (): ILoginStorageData => {
		return login.data;
	};

	const setDataRepository = (_data: ILoginStorageData) => {
		dispatch(reducerLoginData(_data));
	};

	return {
		getDataRepository,
		setDataRepository,
	};
};

export default useLoginRepository;
