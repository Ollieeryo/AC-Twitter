import styles from './TweetList.module.scss';

import reply from '../../assets/reply.svg';
import like from '../../assets/like.svg';
import { Link } from 'react-router-dom';

function TweetList({ onTweetClick, onReplyClick, onLikeClick, tweetList }) {
	const account = tweetList?.User?.account;

	const listItems = tweetList.map((item) => (
		<div className={styles.itemContainer} key={item.id}>
			<Link className={styles.avatar} to={`/${account}`}>
				<img src={item?.User?.avatar} />
			</Link>
			<div className={styles.infoSection}>
				<div className={styles.nameSection}>
					<Link className={styles.name} to={`/${account}`}>
						{item?.User?.name}
					</Link>
					<div className={styles.accountAndPeriod}>
						<Link to={`/${account}`}>{`@${item?.User?.account}．`}</Link>
						{`${item?.period}`}
					</div>
				</div>
				<div
					className={styles.contentSection}
					onClick={() => {
						onTweetClick(item?.id);
					}}
				>
					{item.description}
				</div>
				<div className={styles.ReplyAndLike}>
					<div
						className={styles.counter}
						onClick={() => {
							onReplyClick(item.id);
						}}
					>
						<img src={reply} />
						{item.replyCounts}
					</div>
					<button
						className={styles.counter}
						onClick={() => {
							onLikeClick(item?.id);
						}}
					>
						<img src={like} />
						{item?.likeCounts}
					</button>
				</div>
			</div>
		</div>
	));

	return <div className={styles.container}>{listItems}</div>;
}

export default TweetList;
