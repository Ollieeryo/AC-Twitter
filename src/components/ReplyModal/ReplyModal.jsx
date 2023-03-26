import styles from './ReplyModal.module.scss';
import Main from '../../pages/Main/Index';
import TextareaAutosize from 'react-textarea-autosize';

import IconX from '../../assets/X-icon.svg';
import manAvatar from '../../assets/manAvatar.svg';
import fakeAvatar from '../../assets/fake-avatar.svg';

function ReplyModal() {
	return (
		<div className={styles.container}>
			<Cover />
			<Modal accountName='@apple' />
			<Main />
		</div>
	);
}

// 改成引入
export function Cover() {
	return <div className={styles.cover}></div>;
}

function Modal({ accountName }) {
	return (
		<div className={styles.replyModalContainer}>
			<div className={styles.modalHead}>
				<a className={styles.iconX} href='home'>
					<img src={IconX} />
				</a>
			</div>
			<div className={styles.tweetSection}>
				<div className={styles.avatar} href='apple'>
					<img src={fakeAvatar} />
					<div className={styles.line}></div>
				</div>
				<div className={styles.infoSection}>
					<div className={styles.nameSection}>
						<div className={styles.nickname}>Apple</div>
						<div className={styles.accountAndPeriod}>@apple．3小時 </div>
					</div>
					<div className={styles.contentSection}>
						Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.
						Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
					</div>
					<div className={styles.replyTo}>
						回覆給&nbsp;<span>{accountName}</span>
					</div>
				</div>
			</div>
			<div className={styles.replySection}>
				<div className={styles.img}>
					<img src={manAvatar} />
				</div>
				<TextareaAutosize className={styles.inputTweet} placeholder='推你的回覆' autoFocus />
			</div>
			<a className={styles.tweetButton} href=''>
				回覆
			</a>
		</div>
	);
}

export default ReplyModal;
