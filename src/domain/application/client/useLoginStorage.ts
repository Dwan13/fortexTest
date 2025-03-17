import useLoginRepository from 'app/infrastructure/persistence/repositories/useLoginRepository';
import { ILoginStorageData } from 'app/domain/application/interfaces/ILoginStorage';

const useLoginStorage = () => {
	const { setDataRepository, getDataRepository } = useLoginRepository();
	const setLogin = (_formData: ILoginStorageData) => {	
			
		setDataRepository(_formData);
	};
	const getLogin = (): ILoginStorageData => {
		return getDataRepository();
	};

	return { setLogin, getLogin };
};

export default useLoginStorage;
