import styles from './ReplyPost.module.scss';
import reply from '../../assets/reply.svg';
import like from '../../assets/like.svg';
import { Link } from 'react-router-dom';

function ReplyPost({ tweet }) {
	function handleLikeClick() {
		if (tweet.isLiked === false) {
			return {
				...tweet,
				likeCounts: tweet.likeCounts + 1,
				isLiked: !tweet.isLiked,
			};
		} else {
			return {
				...tweet,
				likeCounts: tweet.likeCounts - 1,
				isLiked: !tweet.isLiked,
			};
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.avatarAndName}>
				<Link className={styles.avatar} to={`/${tweet?.User?.account}`}>
					<img src={tweet?.User?.avatar} />
				</Link>
				<div className={styles.nameSection}>
					<div className={styles.nickname}>{tweet?.User?.name}</div>
					<div className={styles.accountName}>@{tweet?.User?.account}</div>
				</div>
			</div>

			<div className={styles.infoSection}>
				<div className={styles.contentSection}>{tweet?.description}</div>
				<div className={styles.postTime}>{tweet?.createdAt}</div>
				<div className={styles.ReplyAndLike}>
					<Link className={styles.counter} to='replymodal'>
						{tweet?.replyCounts} <span>&nbsp;回覆</span>
					</Link>
					<div
						className={styles.counter}
						onClick={() => {
							handleLikeClick(tweet?.id);
						}}
					>
						{tweet?.likeCounts}
						<span>&nbsp;喜歡次數</span>
					</div>
				</div>
				<div className={styles.Icons}>
					<Link className={styles.icon} to='replymodal'>
						<img src={reply} />
					</Link>
					<button className={styles.icon} onClick={handleLikeClick}>
						<img src={like} />
					</button>
				</div>
			</div>
		</div>
	);
}

export default ReplyPost;
