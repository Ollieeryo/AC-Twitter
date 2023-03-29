import styles from './ReplyList.module.scss';
// import { createContext, useContext } from 'react';
import { Link } from 'react-router-dom';

import { getAllReply } from '../../api/reply';
import { useEffect } from 'react';
import { useState } from 'react';

function ReplyList() {
	// const items = useContext(ReplyItemContext);
	const [replies, setReplies] = useState([]);

	const listItems = replies.map((item) => (
		<div className={styles.itemContainer} key={item.id}>
			<Link className={styles.avatar} to={item.User.account}>
				<img src={item.User.avatar} />
			</Link>
			<div className={styles.infoSection}>
				<div className={styles.nameSection}>
					<Link className={styles.name} to={item.User.account}>
						{item.User.name}
					</Link>
					<div className={styles.accountAndPeriod}>
						<Link to={item.User.account}>{`@${item.User.account}．`}</Link>
						{`${item.period}`}
					</div>
				</div>
				<div className={styles.replyTo}>
					回覆&nbsp;<Link to={item.Tweet.User.account}>{`@${item.Tweet.User.account}`}</Link>
				</div>
				<div className={styles.contentSection}>{item.comment}</div>
			</div>
		</div>
	));

	useEffect(() => {
		const getRepliesAsync = async () => {
			try {
				const authToken = localStorage.getItem('authToken');
				const reply = await getAllReply(authToken);

				setReplies(reply.map((reply) => ({ ...reply })));
			} catch (error) {
				console.error(error);
			}
		};
		getRepliesAsync();
	}, []);

	return <div className={styles.container}>{listItems}</div>;
}

// const tryData = [
// 	{
// 		id: 633, // reply id
// 		comment: 'accusamus',
// 		UserId: 154, // 發這則回覆的user id(回覆者)
// 		TweetId: 418, // 這則tweet id
// 		createdAt: '2023-03-24T01:10:34.000Z',
// 		updatedAt: '2023-03-24T01:10:34.000Z',
// 		User: {
// 			// 發這則回覆的user(回覆者)資料
// 			id: 154,
// 			account: 'user2',
// 			name: 'user2',
// 			avatar: 'https://loremflickr.com/320/240/person,mugshot/?random=66.05343757518258',
// 		},
// 		Tweet: {
// 			// 這則tweet以及發這則tweet的user(PO文者)資料
// 			UserId: 156,
// 			User: {
// 				// PO文者的資料
// 				id: 156,
// 				account: 'user4',
// 				name: 'user4',
// 				avatar: 'https://loremflickr.com/320/240/person,mugshot/?random=80.23545321182219',
// 			},
// 		},
// 		period: '3 days ago', // 多久之前發的reply
// 	},
// 	{
// 		id: 631,
// 		comment: 'aut',
// 		UserId: 157,
// 		TweetId: 418,
// 		createdAt: '2023-03-23T01:10:34.000Z',
// 		updatedAt: '2023-03-23T01:10:34.000Z',
// 		User: {
// 			id: 157,
// 			account: 'user5',
// 			name: 'user5',
// 			avatar: 'https://loremflickr.com/320/240/person,mugshot/?random=56.66174558407615',
// 		},
// 		Tweet: {
// 			UserId: 156,
// 			User: {
// 				id: 156,
// 				account: 'user4',
// 				name: 'user4',
// 				avatar: 'https://loremflickr.com/320/240/person,mugshot/?random=80.23545321182219',
// 			},
// 		},
// 		period: '4 days ago',
// 	},
// 	// ......剩下的replies
// ];

// const ReplyItemContext = createContext(tryData);

export default ReplyList;
