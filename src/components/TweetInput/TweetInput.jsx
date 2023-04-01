import styles from './TweetInput.module.scss';
import fakeAvatar from '../../assets/fake-avatar.svg';

import { Link } from 'react-router-dom';

function TweetInput({ onToTweetClick, userData }) {
	const account = userData?.User?.account;

	return (
		<div className={styles.selfTweetSection}>
			<div className={styles.section}>
				<Link className={styles.img} to={`/${account}`}>
					<img src={userData?.avatar || fakeAvatar} />
				</Link>
				<div className={styles.toTweetModal} onClick={onToTweetClick}>
					有什麼新鮮事？
				</div>
			</div>
			<div className={styles.tweetButton} onClick={onToTweetClick}>
				推文
			</div>
		</div>
	);
}

export default TweetInput;
