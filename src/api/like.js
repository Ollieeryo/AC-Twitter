import axios from 'axios';

const baseURL = 'https://morning-hamlet-47874.herokuapp.com/api';

// 將推文加入喜歡
export const postLike = async (authToken, id) => {
	try {
		const res = await axios.post(`${baseURL}/tweets/${id}/like`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});
		console.log(res);
		return res.data;
	} catch (error) {
		console.error('[Post Like failed]: ', error.response.data);
	}
};
// 將推文移除喜歡
export const postUnlike = async (authToken, id) => {
	try {
		const res = await axios.get(`${baseURL}/tweets/${id}/unlike`, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});
		console.log(res);
		return res.data;
	} catch (error) {
		console.error('[Post Unlike failed]: ', error.response.data);
	}
};