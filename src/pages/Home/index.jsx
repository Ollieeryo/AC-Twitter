import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 根據 Token 的不同狀態導引到適合的頁面
const Home = () => {
	const navigate = useNavigate();
	const authToken = localStorage.getItem('authToken');

	useEffect(() => {
		if (authToken) {
			navigate('/main');
		} else {
			navigate('/login');
		}
	}, [navigate]);
};

export default Home;
