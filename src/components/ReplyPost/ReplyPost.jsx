import styles from './ReplyPost.module.scss';
import reply from '../../assets/reply.svg';
import like from '../../assets/like.svg';

import fakeAvatar from '../../assets/fake-avatar.svg';
import { Link } from 'react-router-dom';

function ReplyPost({ onLikeClick }) {
	return (
		<div className={styles.container}>
			<div className={styles.avatarAndName}>
				<Link className={styles.avatar} to='apple'>
					<img src={fakeAvatar} />
				</Link>
				<div className={styles.nameSection}>
					<div className={styles.nickname}> Apple</div>
					<div className={styles.accountName}>@apple</div>
				</div>
			</div>
			<div className={styles.infoSection}>
				<div className={styles.contentSection}>
					Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.
					Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
				</div>
				<div className={styles.postTime}>上午 10:05・2021年11月10日</div>
				<div className={styles.ReplyAndLike}>
					<Link to='reply'>
						34 <span>&nbsp;回覆</span>
					</Link>
					<Link to=''>
						808<span>&nbsp;喜歡次數</span>
					</Link>
				</div>
				<div className={styles.Icons}>
					<Link className={styles.icon} to='reply'>
						<img src={reply} />
					</Link>
					<button className={styles.icon} onClick={onLikeClick}>
						<img src={like} />
					</button>
				</div>
			</div>
		</div>
	);
}

export default ReplyPost;
