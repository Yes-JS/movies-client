import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { request } from '~utils/request';
import { RootState } from '~store/reducers';

import { authApiUrl, name } from './constants';
import { IAuthError, ISessionData } from './slice';

export const login = createAsyncThunk<
	ISessionData,
	{ email: string; password: string },
	{
		state: RootState;
		rejectValue: IAuthError;
	}
>(`${name}/login`, async ({ email, password }, thunkApi) => {
	try {
		const { data }: AxiosResponse<ISessionData> = await request({
			method: 'post',
			url: `${authApiUrl}/login`,
			data: {
				email,
				password,
			},
			withCredentials: true,
		});

		return data;
	} catch (err: AxiosError<IAuthError, null>) {
		if (!err.response) {
			throw err;
		}

		return thunkApi.rejectWithValue(err.response.data);
	}
});

export const signup = createAsyncThunk<
	ISessionData,
	{ email: string; password: string; secondPassword: string },
	{
		state: RootState;
		rejectValue: IAuthError;
	}
>(`${name}/signup`, async ({ email, password, secondPassword }, thunkApi) => {
	try {
		const { data }: AxiosResponse<ISessionData> = await request({
			method: 'post',
			url: `${authApiUrl}/signup`,
			data: {
				email,
				password,
				secondPassword,
			},
			withCredentials: true,
		});

		return data;
	} catch (err: AxiosError<IAuthError, null>) {
		if (!err.response) {
			throw err;
		}

		return thunkApi.rejectWithValue(err.response.data);
	}
});
