import axios from 'axios';

const baseURL = 'https://morning-hamlet-47874.herokuapp.com/api';

// 新增追蹤
export const postFollow = async (authToken) => {
	try {
		const res = await axios.post(`${baseURL}/followships`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});
		console.log(res);
		return res.data;
	} catch (error) {
		console.error('[Post Follow failed]: ', error);
	}
};
// 取消追蹤
export const deleteFollow = async (authToken, followingId) => {
	try {
		const res = await axios.delete(`${baseURL}/followships/${followingId}`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Delete Follow failed]: ', error.response.data);
	}
};

// 推薦跟隨名單
export const recommendedFollowList = async (authToken) => {
	try {
		const res = await axios.get(`${baseURL}/followships/top`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});
		return res.data.topUsers;
	} catch (error) {
		console.error('[Get Recommended FollowList failed]: ', error.response.data);
	}
};
