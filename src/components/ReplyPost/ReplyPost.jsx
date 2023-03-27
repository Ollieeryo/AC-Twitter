import styles from './ReplyPost.module.scss';
import reply from '../../assets/reply.svg';
import like from '../../assets/like.svg';

import fakeAvatar from '../../assets/fake-avatar.svg';

function ReplyPost() {
	return (
		<div className={styles.container}>
			<div className={styles.avatarAndName}>
				<a className={styles.avatar} href='apple'>
					<img src={fakeAvatar} />
				</a>
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
					<a href='replyModal'>
						34 <span>&nbsp;回覆</span>
					</a>
					<a href=''>
						808<span>&nbsp;喜歡次數</span>
					</a>
				</div>
				<div className={styles.Icons}>
					<a className={styles.icon} href='replyModal'>
						<img src={reply} />
					</a>
					<a className={styles.icon} href='toLike'>
						<img src={like} />
					</a>
				</div>
			</div>
		</div>
	);
}

export default ReplyPost;
