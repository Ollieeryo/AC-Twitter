import styles from './ReplyPost.module.scss';
import reply from '../../assets/reply.svg';
import like from '../../assets/like.svg';
import redLike from '../../assets/redLike.svg';

function ReplyPost({ tweet, onReplyClick, onOtherClick, onLikeClick }) {
	// const handleLikeToggle = (data) => {
	// 	const result = data.isLiked;
	// 	return (data.isLiked = !result);
	// };

	return (
		<div className={styles.container}>
			<div className={styles.avatarAndName}>
				<div className={styles.avatar} onClick={onOtherClick}>
					<img src={tweet?.User?.avatar} />
				</div>
				<div className={styles.nameSection}>
					<div className={styles.nickname} onClick={onOtherClick}>
						{tweet?.User?.name}
					</div>
					<div className={styles.accountName} onClick={onOtherClick}>
						@{tweet?.User?.account}
					</div>
				</div>
			</div>

			<div className={styles.infoSection}>
				<div className={styles.contentSection}>{tweet?.description}</div>
				<div className={styles.postTime}>{tweet?.createdAt}</div>
				<div className={styles.ReplyAndLike}>
					<div className={styles.counter}>
						{tweet?.replyCounts} <span>&nbsp;回覆</span>
					</div>
					<div className={styles.counter}>
						{tweet?.likeCounts}
						<span>&nbsp;喜歡次數</span>
					</div>
				</div>
				<div className={styles.Icons}>
					<div
						className={styles.icon}
						onClick={() => {
							onReplyClick(tweet?.id);
						}}
					>
						<img src={reply} />
					</div>
					<button
						className={styles.icon}
						onClick={() => {
							onLikeClick(tweet?.id);
						}}
					>
						{tweet.isLiked ? <img src={redLike} /> : <img src={like} />}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ReplyPost;
