import styles from './TweetList.module.scss';
// import { createContext, useContext } from 'react';
import { getTweets } from '../../api/tweets';

import reply from '../../assets/reply.svg';
import like from '../../assets/like.svg';
// 暫時用 fakeAvatar 作為頭像
// import fakeAvatar from '../../assets/fake-avatar.svg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

function TweetList({ onLikeClick }) {
	// const items = useContext(TweetItemContext);
	const [tweets, setTweets] = useState([]);
	// const repliesCount = 13;

	const listItems = tweets.map((item) => (
		<div className={styles.itemContainer} key={item.id}>
			<Link className={styles.avatar} to={item.User.account}>
				<img src={item.User.avatar} />
			</Link>
			<div className={styles.infoSection}>
				<div className={styles.nameSection}>
					<Link className={styles.name} to={item.User.name}>
						{item.User.name}
					</Link>
					<div className={styles.accountAndPeriod}>
						<Link to={item.User.account}>{`@${item.User.account}．`}</Link>
						{`${item.period}`}
					</div>
				</div>
				<div className={styles.contentSection}>{item.description}</div>
				<div className={styles.ReplyAndLike}>
					<Link className={styles.counter} to='reply'>
						<img src={reply} />
						{item.replyCounts}
					</Link>
					<button className={styles.counter} onClick={onLikeClick}>
						<img src={like} />
						{item.likeCounts}
					</button>
				</div>
			</div>
		</div>
	));

	useEffect(() => {
		const getTweetsAsync = async () => {
			try {
				const authToken = localStorage.getItem('authToken');
				const tweet = await getTweets(authToken);

				setTweets(tweet.map((tweet) => ({ ...tweet })));
			} catch (error) {
				console.error(error);
			}
		};
		getTweetsAsync();
	}, []);

	return (
		<Link className={styles.hrefContainer} to='replylist'>
			{listItems}
		</Link>
	);
}

// const dummyData = [
// 	{
// 		id: 471, // tweet id
// 		description: 'hi',
// 		UserId: 158, // 發這則tweet的user id
// 		createdAt: '2023-03-26T06:48:26.000Z',
// 		updatedAt: '2023-03-26T06:48:26.000Z',
// 		User: {
// 			// 發這則tweet的user資料
// 			id: 158,
// 			name: 'test1',
// 			account: 'test1',
// 			avatar: 'https://i.imgur.com/XHOlIo5.png',
// 		},
// 		period: '19 hours ago', // 多久之前發的tweet
// 		replyCounts: 0, // 這則tweet的回覆數
// 		likeCounts: 0, // 這則tweet的按讚數
// 		isLiked: false, // 目前登入的使用者是否對這則tweet按讚
// 	},
// 	{
// 		id: 416,
// 		description: 'Consequuntur eos blanditiis voluptatem explicabo.',
// 		UserId: 154,
// 		createdAt: '2023-03-26T01:10:34.000Z',
// 		updatedAt: '2023-03-26T01:10:34.000Z',
// 		User: {
// 			id: 154,
// 			name: 'user2',
// 			account: 'user2',
// 			avatar: 'https://loremflickr.com/320/240/person,mugshot/?random=66.05343757518258',
// 		},
// 		period: 'a day ago',
// 		replyCounts: 3,
// 		likeCounts: 1,
// 		isLiked: true,
// 	},
// 	{
// 		id: 431,
// 		description: 'Recusandae sunt ipsum vero quia tempora qui est.',
// 		UserId: 154,
// 		createdAt: '2023-03-25T01:10:34.000Z',
// 		updatedAt: '2023-03-25T01:10:34.000Z',
// 		User: {
// 			id: 154,
// 			name: 'user2',
// 			account: 'user2',
// 			avatar: 'https://loremflickr.com/320/240/person,mugshot/?random=66.05343757518258',
// 		},
// 		period: '2 days ago',
// 		replyCounts: 3,
// 		likeCounts: 0,
// 		isLiked: false,
// 	},
// 	{
// 		id: 410,
// 		description: 'Incidunt minus sunt.',
// 		UserId: 153,
// 		createdAt: '2023-03-23T01:10:34.000Z',
// 		updatedAt: '2023-03-23T01:10:34.000Z',
// 		User: {
// 			id: 153,
// 			name: 'user11',
// 			account: 'user11',
// 			avatar: 'https://loremflickr.com/320/240/person,mugshot/?random=76.07058057372518',
// 		},
// 		period: '4 days ago',
// 		replyCounts: 3,
// 		likeCounts: 1,
// 		isLiked: false,
// 	},
// ];

// const TweetItemContext = createContext(dummyData);

export default TweetList;
