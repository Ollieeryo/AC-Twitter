import axios from 'axios';

const authURL = 'https://morning-hamlet-47874.herokuapp.com/api';

// 獲取當前登入使用者資料，需要帶入使用者 ID
export const getUserData = async (userId, authToken) => {
	try {
		const response = await axios.get(`${authURL}/users/${userId}`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});

		return response.data;
	} catch (error) {
		console.error('[Get User Data Failed]: ', error);
	}
};

// 獲取使用者個人推文，需要帶入使用者 ID
export const getUserTweets = async (userId, authToken) => {
	try {
		const response = await axios.get(`${authURL}/users/${userId}/tweets`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});

		return response.data;
	} catch (error) {
		console.error(`Error fetching tweets for user ${userId}: ${error}`);
	}
};

// 獲取使用者正在回覆的貼文
export const getUserReplyTweets = async (userId, authToken) => {
	try {
		const response = await axios.get(`${authURL}/users/${userId}/replied_tweets`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});

		return response.data;
	} catch (error) {
		console.error(`Error fetching ReplyTweets for user ${userId}: ${error}`);
	}
};

// 獲取使用者喜歡的推文
export const getUserLikeTweets = async (userId, authToken) => {
	try {
		const response = await axios.get(`${authURL}/users/${userId}/likes`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});

		return response.data;
	} catch (error) {
		console.error(`Error fetching LikeTweets for user ${userId}: ${error}`);
	}
};

// 獲取使用者被追隨清單
export const getFollowedList = async (userId, authToken) => {
	try {
		const response = await axios.get(`${authURL}/users/${userId}/followers`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});

		return response.data;
	} catch (error) {
		console.error(`Error fetching followedList for user ${userId}: ${error}`);
	}
};

// 獲取使用者追隨中清單
export const getFollowingList = async (userId, authToken) => {
	try {
		const response = await axios.get(`${authURL}/users/${userId}/followings`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});

		return response.data;
	} catch (error) {
		console.error(`Error fetching followingList for user ${userId}: ${error}`);
	}
};

// 編輯個人資料
export const getEditPersonal = async (userId, authToken, name, avatar, cover, introduction) => {
	try {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('avatar', avatar);
		formData.append('cover', cover);
		formData.append('introduction', introduction);

		const response = await axios.put(`${authURL}/users/${userId}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + authToken,
			},
		});

		return response.data;
	} catch (error) {
		console.error(`Error fetching edit personal for user ${userId}: ${error}`);
	}
};

// 追蹤其他使用者
export const addFollow = async (userId, authToken) => {
	try {
		const response = await axios.post(
			`${authURL}/followships`,
			{ id: userId },
			{
				headers: {
					Authorization: 'Bearer ' + authToken,
					'Content-Type': 'application/json',
				},
			},
		);

		return response.data;
	} catch (error) {
		console.error(`Error fetching add follow user ${userId}: ${error}`);
		console.log(error.response);
	}
};

// 取消追蹤其他使用者
export const cancelFollow = async (userId, authToken) => {
	try {
		const response = await axios.delete(`${authURL}/followships/${userId}`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});

		return response.data;
	} catch (error) {
		console.error(`Error fetching cancel follow user ${userId}: ${error}`);
	}
};
