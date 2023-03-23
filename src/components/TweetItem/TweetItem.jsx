import styles from './TweetItem.module.scss';
import reply from '../../assets/reply.svg';
import like from '../../assets/like.svg';
// 暫時用 fakeAvatar 作為頭像
import fakeAvatar from '../../assets/fake-avatar.svg';

function TweetItem() {
	return (
		<a className={styles.hrefContainer} href='appleTweet'>
			<div className={styles.container}>
				<a className={styles.avatar} href='apple'>
					<img src={fakeAvatar} />
				</a>
				<div className={styles.infoSection}>
					<div className={styles.nameSection}>
						<div className={styles.nickname}> Apple</div>
						<div className={styles.accountAndPeriod}>@apple．3小時 </div>
					</div>
					<div className={styles.contentSection}>
						Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.
						Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
					</div>
					<div className={styles.ReplyAndLike}>
						<a className={styles.counter} href='replyModal'>
							<img src={reply} />
							13
						</a>
						<a className={styles.counter} href='toLike'>
							<img src={like} />
							76
						</a>
					</div>
				</div>
			</div>
		</a>
	);
}

export default TweetItem;
