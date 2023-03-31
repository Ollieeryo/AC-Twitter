import styles from './PopularList.module.scss';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { recommendedFollowList } from '../../api/followship';

function PopularList() {
	const [populars, setPopulars] = useState([]);

	function handleFollowToggle(id) {
		setPopulars((prevPopulars) => {
			const updatedPopulars = prevPopulars.map((popular) => {
				if (popular.id === id) {
					return {
						...popular,
						isFollowed: !popular.isFollowed,
						// 正在跟隨/跟隨 增加api
					};
				}
				return popular;
			});
			return updatedPopulars;
		});
	}

	const listItems = populars.slice(0, 8).map((popular) => (
		<div className={styles.otherCard} key={popular.id}>
			<Link className={styles.avatar} to={popular.account}>
				<img src={popular.avatar} />
			</Link>
			<div className={styles.other}>
				<Link className={styles.nickname} to={popular.account}>
					{popular.name}
				</Link>
				<Link className={styles.accountName} to={popular.account}>
					{popular.account}
				</Link>
			</div>
			<button
				onClick={() => handleFollowToggle(popular.id)}
				className={`${styles.btnFollow} ${
					popular.isFollowed ? styles.following : styles.notFollowing
				}`}
			>
				{popular.isFollowed ? '正在跟隨' : '跟隨'}
			</button>
		</div>
	));

	useEffect(() => {
		const getPopularsAsync = async () => {
			try {
				const authToken = localStorage.getItem('authToken');
				const popular = await recommendedFollowList(authToken);
				console.log(popular);

				setPopulars(popular.map((popular) => ({ ...popular })));
			} catch (error) {
				console.error(error);
			}
		};
		getPopularsAsync();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.topic}>
				<p>推薦跟隨</p>
			</div>
			<div className={styles.others}>{listItems}</div>
		</div>
	);
}

export default PopularList;
