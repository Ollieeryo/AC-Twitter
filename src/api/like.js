import axios from 'axios';

const baseURL = 'https://morning-hamlet-47874.herokuapp.com/api';

// 將推文加入喜歡
export const postLike = async (authToken, itemID) => {
	try {
		const res = await axios.post(`${baseURL}/tweets/${itemID}/like`, null, {
			headers: {
				ContentType: 'application/json',
				Authorization: 'Bearer ' + authToken,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Post Like failed]: ', error.response.data);
	}
};

// 將推文移除喜歡
export const postUnlike = async (authToken, id) => {
	try {
		const res = await axios.post(`${baseURL}/tweets/${id}/unlike`, null, {
			headers: {
				Authorization: 'Bearer ' + authToken,
			},
		});
		return res.data;
	} catch (error) {
		console.error('[Post Unlike failed]: ', error.response.data);
		console.log(error);
	}
};
