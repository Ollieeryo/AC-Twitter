import axios from 'axios';

const baseURL = 'https://morning-hamlet-47874.herokuapp.com/api';

// 新增推文
export const postTweet = async ({ description, authToken }) => {
	try {
		const res = await axios.post(
			`${baseURL}/tweets`,
			{ description },
			{
				headers: {
					Authorization: 'Bearer ' + authToken,
				},
			},
		);
		console.log(res);
		return res.data;
	} catch (error) {
		console.error('[Post Tweet failed]: ', error.response.data);
	}
};
// 取得所有貼文
export const getTweets = async (authToken) => {
	try {
		const res = await axios.get(`${baseURL}/tweets`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});
		console.log(res);
		return res.data;
	} catch (error) {
		console.error('[Get Tweet failed]: ', error.response.data);
	}
};

// 取得個別推文
export const getIdTweets = async (authToken, tweetId) => {
	try {
		const res = await axios.get(`${baseURL}/tweets/${tweetId}`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});
		console.log(res);
		return res.data;
	} catch (error) {
		console.error('[Get someone Tweet failed]: ', error.response.data);
	}
};
