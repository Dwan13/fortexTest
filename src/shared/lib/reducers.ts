import { combineReducers } from '@reduxjs/toolkit';

import loginSlice from 'app/infrastructure/persistence/redux/loginSlice';

export default combineReducers({
	login: loginSlice,
});
