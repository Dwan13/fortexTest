/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILoginRequest {
	username: string;
	password: string;
}

export interface ILoginResponse {
	token: string;
	username: string;
	userId: number;
}
