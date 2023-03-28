import axios from 'axios';

const baseURL = 'https://morning-hamlet-47874.herokuapp.com/api';

// 新增推文
export const postTweet = async ({ description }) => {
	try {
		const res = await axios.post(`${baseURL}/tweets`, { description });
		console.log(res);
		return res.data;
	} catch (error) {
		console.error('Post Tweet failed]: ', error);
	}
};
// 取得所有貼文
export const getTweets = async (authToken) => {
	try {
		const res = await axios.get(`${baseURL}/tweets`, {
			// 所有api都要這個header
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});
		console.log(res);
		return res.data;
	} catch (error) {
		console.error('Get Tweet failed]: ', error);
	}
};

// 取得個別推文
export const getIdTweets = async ({ id }) => {
	try {
		const res = await axios.get(`${baseURL}/tweets/:tweet_${id}`);
		console.log(res);
		return res.data;
	} catch (error) {
		console.error('Get someone Tweet failed]: ', error);
	}
};
