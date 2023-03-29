import axios from 'axios';

const baseURL = 'https://morning-hamlet-47874.herokuapp.com/api';

// 在推文底下新增回覆
export const postReply = async (authToken, comment, tweetId) => {
	try {
		const res = await axios.post(
			// 24 tweetId
			`${baseURL}/tweets/${tweetId}/replies`,
			{ comment },
			{
				headers: {
					Authorization: 'Bearer ' + authToken,
				},
			},
		);
		console.log(res);
		return res.data;
	} catch (error) {
		console.error('[Post Reply failed]: ', error.response.data);
	}
};
// 取得推文中所有回覆
export const getAllReply = async (authToken) => {
	try {
		// 24 tweetId ${tweetId}
		const res = await axios.get(`${baseURL}/tweets/24/replies`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Get All Replies to a Tweet failed]: ', error.response.data);
	}
};
