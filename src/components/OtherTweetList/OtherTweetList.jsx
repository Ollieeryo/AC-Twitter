import styles from './OtherTweetList.module.scss';

import reply from '../../assets/reply.svg';
import like from '../../assets/like.svg';

function TweetList({ tweetList }) {
	const listItems = tweetList?.map((item) => (
		<div className={styles.itemContainer} key={item?.id}>
			<div className={styles.avatar}>
				<img src={item?.User?.avatar} />
			</div>
			<div className={styles.infoSection}>
				<div className={styles.nameSection}>
					<div className={styles.name}>{item?.User?.name}</div>
					<div className={styles.accountAndPeriod}>
						<div>{`@${item?.User?.account}．`}</div>
						{`${item?.period}`}
					</div>
				</div>
				<div className={styles.contentSection}>{item?.description}</div>
				<div className={styles.ReplyAndLike}>
					<div className={styles.counter}>
						<img src={reply} />
						{item?.replyCounts}
					</div>
					<button className={styles.counter}>
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
