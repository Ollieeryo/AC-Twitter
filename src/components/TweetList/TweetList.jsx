import styles from './TweetList.module.scss';
import { getTweets } from '../../api/tweets';

import reply from '../../assets/reply.svg';
import like from '../../assets/like.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function TweetList({ onTweetClick, onReplyClick }) {
	const [tweets, setTweets] = useState([]);
	const navigate = useNavigate();

	function handleLikeClick(itemID) {
		setTweets(
			tweets.map((item) => {
				if (item.id === itemID) {
					if (item.isLiked === false) {
						return {
							...item,
							likeCounts: item.likeCounts + 1,
							isLiked: !item.isLiked,
						};
					} else {
						return {
							...item,
							likeCounts: item.likeCounts - 1,
							isLiked: !item.isLiked,
						};
					}
				} else {
					return item;
				}
			}),
		);
	}

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
				<div
					className={styles.contentSection}
					onClick={() => {
						onTweetClick(item.id);
					}}
				>
					{item.description}
				</div>
				<div className={styles.ReplyAndLike}>
					<div className={styles.counter} onClick={onReplyClick}>
						<img src={reply} />
						{item.replyCounts}
					</div>
					<button
						className={styles.counter}
						onClick={() => {
							handleLikeClick(item.id);
						}}
					>
						<img src={like} />
						{item.likeCounts}
					</button>
				</div>
			</div>
		</div>
	));

	const getTweetsAsync = async () => {
		try {
			const authToken = localStorage.getItem('authToken');
			const tweet = await getTweets(authToken);
			if (!authToken) {
				navigate('/login');
				return;
			}
			setTweets(tweet.map((tweet) => ({ ...tweet })));
		} catch (error) {
			console.error(error);
		}
	};
	getTweetsAsync();

	return <div className={styles.container}>{listItems}</div>;
}

export default TweetList;
