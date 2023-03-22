import styles from './TweetInput.module.scss';

import manAvatar from '../../assets/manAvatar.svg';

function TweetInput() {
	return (
		<div className={styles.selfTweetSection}>
			<div className={styles.section}>
				<a className={styles.img} href='self'>
					<img src={manAvatar} />
				</a>
				<a className={styles.toTweetModal} href='TweetModal'>
					有什麼新鮮事？
				</a>
			</div>
			<a className={styles.tweetButton} href='TweetModal'>
				推文
			</a>
		</div>
	);
}

export default TweetInput;
