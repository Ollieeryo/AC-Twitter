import styles from './TweetModal.module.scss';
import Main from '../../pages/Main/Index';
import TextareaAutosize from 'react-textarea-autosize';

import IconX from '../../assets/X-icon.svg';
import manAvatar from '../../assets/manAvatar.svg';

function TweetModal() {
	return (
		<div className={styles.container}>
			<Cover />
			<Modal />
			<Main />
		</div>
	);
}

function Cover() {
	return <div className={styles.cover}></div>;
}

function Modal() {
	return (
		<div className={styles.tweetModalContainer}>
			<div className={styles.tweetModal}>
				<div className={styles.modalHead}>
					<a className={styles.iconX} href='home'>
						<img src={IconX} />
					</a>
				</div>
				<div className={styles.section}>
					<a className={styles.img} href='self'>
						<img src={manAvatar} />
					</a>

					<TextareaAutosize className={styles.inputTweet} placeholder='有什麼新鮮事？' autoFocus />
				</div>
				<a className={styles.tweetButton} href=''>
					推文
				</a>
			</div>
		</div>
	);
}

export default TweetModal;
