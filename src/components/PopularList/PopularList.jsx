import styles from './PopularList.module.scss';

import { Link } from 'react-router-dom';
// import { createContext } from 'react';
import { useEffect, useState } from 'react';
// import { recommendedFollowList } from '../../api/followship';

function PopularList() {
	const [populars, setPopulars] = useState([]);
	// const populars = useContext(popularsContext);

	function handleFollowToggle(id) {
		setPopulars((prevPopulars) => {
			const updatedPopulars = prevPopulars.map((popular) => {
				if (popular.id === id) {
					return {
						...popular,
						isFollowed: !popular.isFollowed,
					};
				}
				return popular;
			});
			return updatedPopulars;
		});
	}

	const listItems = populars.map((popular) => (
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
				// const popular = await recommendedFollowList(authToken);
				const popular = await data(authToken);
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

const topUsers = [
	{
		id: 157, // user id
		account: 'user5',
		name: 'user5',
		avatar: 'https://loremflickr.com/320/240/person,mugshot/?random=56.66174558407615',
		followerCounts: 4, // follower數量
		isFollowed: true, // 目前登入的使用者是否有follow這個user
	},
	{
		id: 156,
		account: 'user4',
		name: 'user4',
		avatar: 'https://loremflickr.com/320/240/person,mugshot/?random=80.23545321182219',
		followerCounts: 3,
		isFollowed: false,
	},
	// ...剩下幾位topUsers,
];

function data() {
	return topUsers;
}
// const arrData = Object.values(backendData);
// const popularsContext = createContext(topUsers);

export default PopularList;
