import axios from 'axios';

const baseURL = 'https://morning-hamlet-47874.herokuapp.com/api';

// 在推文底下新增回覆
export const postReply = async ({ comment, id }) => {
	try {
		const res = await axios.post(`${baseURL}/tweets/:tweet_${id}/replies`, { comment });
		console.log(res);
		return res.data;
	} catch (error) {
		console.error('Post Reply failed]: ', error);
	}
};
// 取得推文中所有回覆
export const getAllReply = async ({ id }) => {
	try {
		const res = await axios.get(`${baseURL}/tweets/:tweet_${id}/replies`);
		console.log(res);
		return res.data;
	} catch (error) {
		console.error('Get All Replies to a Tweet failed]: ', error);
	}
};
