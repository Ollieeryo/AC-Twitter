import styles from './TweetInput.module.scss';

import { Link } from 'react-router-dom';

function TweetInput({ onToTweetClick, self }) {
	return (
		<div className={styles.selfTweetSection}>
			<div className={styles.section}>
				<Link className={styles.img} to='self'>
					<img src={self?.avatar} />
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
