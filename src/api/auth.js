import axios from 'axios';

const authURL = 'https://morning-hamlet-47874.herokuapp.com/api';

// login API 請求
export const login = async ({ account, password }) => {
	try {
		const { data } = await axios.post(`${authURL}/users/signin`, { account, password });

		const { authToken, status, user } = data;

		if (authToken && status === 'success') {
			return { success: true, user, ...data };
		}

		return { success: false };
	} catch (error) {
		console.error('[Login Failed]:', error);
		// 擋後臺帳號登入
		const wrongAdminAccount = error.response.data.message;

		// 帳號不存在
		const wrongAccountPassword = error.response.data;

		return { success: false, wrongAdminAccount, wrongAccountPassword };
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

		const { status } = data;

		if (status === 'success') {
			return { registered: null, success: true, ...data };
		}

		return data;
	} catch (error) {
		console.error('[Register Failed]: ', error);
		const registered = error.response.data.message;

		return { registered, success: false, ...error.response.data };
	}
};

// 後台登入 API 請求
export const adminLogin = async ({ account, password }) => {
	try {
		const { data } = await axios.post(`${authURL}/admin/signin`, { account, password });

		const { authToken, status } = data;

		// 如果 token 有效
		if (authToken && status === 'success') {
			return { success: true, ...data };
		}

		return data;
	} catch (error) {
		console.error('[Login Failed]:', error);

		const wrongAccountPassword = error.response.data;

		const wrongAccountPassword2 = error.response.data.message;

		return { wrongAccountPassword, wrongAccountPassword2 };
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

		return data;
	} catch (error) {
		console.error('[Check Permission Failed]:', error);
	}
};
