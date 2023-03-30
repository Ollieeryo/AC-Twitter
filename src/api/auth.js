// import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const authURL = 'https://morning-hamlet-47874.herokuapp.com/api';

// login API 請求
export const login = async ({ account, password }) => {
	try {
		const { data } = await axios.post(`${authURL}/users/signin`, { account, password });

		// console.log(data.user.id);

		const { authToken, status, user } = data;
		// console.log(user);
		// 如果 token 有效
		if (authToken && status === 'success') {
			return { success: true, user, ...data };
		}

		// return data;
		return { success: false };
	} catch (error) {
		console.error('[Login Failed]:', error);
		// 擋後臺帳號登入
		const wrongAdminAccount = error.response.data.message;
		if (wrongAdminAccount === 'Error: Account or password is wrong!') {
			alert('帳號或密碼錯誤!');
		}

		// 帳號不存在 考慮是否要改成 modal
		const wrongAccountPassword = error.response.data;
		if (wrongAccountPassword === 'Unauthorized') {
			alert('帳號或密碼錯誤!');
		}

		return { success: false };
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

		// console.log(data);

		const { status } = data;

		if (status === 'success') {
			return { registered: null, success: true, ...data };
		}

		return data;
	} catch (error) {
		console.error('[Register Failed]: ', error);
		console.log(error.response.data.message);
		const registered = error.response.data.message;

		return { registered, success: false, ...error.response.data };
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

		return data;
	} catch (error) {
		console.error('[Check Permission Failed]:', error);
	}
};
