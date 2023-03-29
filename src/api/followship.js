import axios from 'axios';

const baseURL = 'https://morning-hamlet-47874.herokuapp.com/api';

// 新增追蹤
export const postFollow = async ({ id }) => {
	try {
		const res = await axios.post(`${baseURL}/followships`, { id });
		console.log(res);
		return res.data;
	} catch (error) {
		console.error('Post Follow failed]: ', error);
	}
};
// 取消追蹤
export const deleteFollow = async ({ followingId }) => {
	try {
		const res = await axios.delete(`${baseURL}/followships/:${followingId}`);
		console.log(res);
		return res.data;
	} catch (error) {
		console.error('Delete Follow failed]: ', error);
	}
};

// 推薦跟隨名單
export const recommendedFollowList = async () => {
	try {
		const res = await axios.get(`${baseURL}/followships/top`);
		console.log(res);
		return res.data;
	} catch (error) {
		console.error('Get Recommended FollowList failed]: ', error);
	}
};
