import axios from 'axios';

const authURL = 'https://morning-hamlet-47874.herokuapp.com/api';

// login API 請求
export const login = async ({ account, password }) => {
	try {
		const { data } = await axios.post(`${authURL}/users/signin`, { account, password });

		console.log(data);

		const { authToken } = data;

		// 如果 token 有效
		if (authToken) {
			return { success: true, ...data };
		}

		return data;
	} catch (error) {
		console.error('[Login Failed]:', error);
	}
};

// Register API 請求
export const register = async ({ account, name, email, password, checkPassword }) => {
	try {
		const { data } = await axios.post(`${authURL}/users`, {
			account,
			name,
			email,
			password,
			checkPassword,
		});

		// const { authToken } = data;
		const { status } = data;

		if (status === 'success') {
			return { success: true, ...data };
		}

		return data;
	} catch (error) {
		console.error('[Register Failed]: ', error);
	}
};

// 後台登入 API 請求
export const adminLogin = async ({ account, password }) => {
	try {
		const { data } = await axios.post(`${authURL}/admin/signin`, { account, password });

		console.log(data);

		const { authToken } = data;

		// 如果 token 有效
		if (authToken) {
			return { success: true, ...data };
		}

		return data;
	} catch (error) {
		console.error('[Login Failed]:', error);
	}
};

// 驗證身分 API
export const checkPermission = async (authToken) => {
	try {
		const { data } = await axios.get(`${authURL}/tweets`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});

		console.log('second', data);
		// return response.data.status;
	} catch (error) {
		console.error('[Check Permission Failed]:', error);
	}
};
