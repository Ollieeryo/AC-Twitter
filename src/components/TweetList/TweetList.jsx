import styles from './TweetList.module.scss';

import reply from '../../assets/reply.svg';
import like from '../../assets/like.svg';

function TweetList({ onTweetClick, onReplyClick, onLikeClick, tweetList, onOtherClick }) {
	const listItems = tweetList?.map((item) => (
		<div className={styles.itemContainer} key={item?.id}>
			<div
				className={styles.avatar}
				onClick={() => {
					onOtherClick(item?.User?.id);
				}}
			>
				<img src={item?.User?.avatar} />
			</div>
			<div className={styles.infoSection}>
				<div className={styles.nameSection}>
					<div
						className={styles.name}
						onClick={() => {
							onOtherClick(item?.User?.id);
						}}
					>
						{item?.User?.name}
					</div>
					<div className={styles.accountAndPeriod}>
						<div
							onClick={() => {
								onOtherClick(item?.User?.id);
							}}
						>{`@${item?.User?.account}．`}</div>
						{`${item?.period}`}
					</div>
				</div>
				<div
					className={styles.contentSection}
					onClick={() => {
						onTweetClick(item?.id);
					}}
				>
					{item?.description}
				</div>
				<div className={styles.ReplyAndLike}>
					<div
						className={styles.counter}
						onClick={() => {
							onReplyClick(item?.id);
						}}
					>
						<img src={reply} />
						{item?.replyCounts}
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
