import axios from 'axios';

const authURL = 'https://morning-hamlet-47874.herokuapp.com/api';

// 更改帳戶資料
export const getChangeAccount = async (
	userId,
	authToken,
	account,
	email,
	name,
	password,
	checkPassword,
) => {
	try {
		const response = await axios.put(
			`${authURL}/users/${userId}/setting`,
			{
				account,
				email,
				name,
				password,
				checkPassword,
			},
			{
				headers: {
					Authorization: 'Bearer ' + authToken,
				},
			},
		);

		return response.data;
	} catch (error) {
		console.error(`Error fetching followedList for user ${userId}: ${error}`);
		if (error.response.data.message === 'Error: account already exists!') {
			alert('此帳號已存在');
		}

		if (error.response.data.message === 'Error: email already exists!') {
			alert('此 Email 已存在');
		}
	}
};
