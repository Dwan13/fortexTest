import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
	ILoginStorage,
	ILoginStorageData,
	ILoginFormData,
} from 'app/domain/application/interfaces/ILoginStorage';

const initialState: ILoginStorage = {
	data: {
		loading: false,
		formData: {
			username: '',
			password: '',
			rememberMe: false,
		} as ILoginFormData,
	},
};

export const loginSlice = createSlice({
	name: 'loginSlice',
	initialState,
	reducers: {
		reducerLoginData: (state, action: PayloadAction<ILoginStorageData>) => {
			state.data = action.payload;
		},
	},
});

export const { reducerLoginData } = loginSlice.actions;
export default loginSlice.reducer;
