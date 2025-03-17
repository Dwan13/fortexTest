export interface ILoginStorage {
	data: ILoginStorageData;
}
export interface ILoginStorageData {
	formData: ILoginFormData;
	userIncorrect?: boolean;
	loading: boolean;
}

export interface ILoginFormData {
	username: string;
	password: string;
	isValidPassword: boolean | undefined;
	rememberMe: boolean;
	loginSuccess: boolean | undefined;
  }
  