import styles from './TweetInput.module.scss';

import manAvatar from '../../assets/manAvatar.svg';
import { Link } from 'react-router-dom';

function TweetInput() {
	return (
		<div className={styles.selfTweetSection}>
			<div className={styles.section}>
				<Link className={styles.img} to='self'>
					<img src={manAvatar} />
				</Link>
				<Link className={styles.toTweetModal} to='tweet'>
					有什麼新鮮事？
				</Link>
			</div>
			<Link className={styles.tweetButton} to='tweet'>
				推文
			</Link>
		</div>
	);
}

export default TweetInput;
