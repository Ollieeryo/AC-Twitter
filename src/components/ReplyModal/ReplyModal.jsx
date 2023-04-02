import styles from './ReplyModal.module.scss';
import TextareaAutosize from 'react-textarea-autosize';

import IconX from '../../assets/X-icon.svg';
import fakeAvatar from '../../assets/fake-avatar.svg';
import { Link } from 'react-router-dom';

function ReplyModal({
	onCloseModal,
	author,
	userData,
	onReplyClick,
	onTextChange,
	prompts,
	texts,
}) {
	const account = userData?.User?.account;
	return (
		<div className={styles.container}>
			<Cover />
			<div className={styles.replyModalContainer}>
				<div className={styles.modalHead}>
					<div className={styles.iconX} onClick={onCloseModal}>
						<img src={IconX} />
					</div>
				</div>
				<div className={styles.tweetSection}>
					<Link className={styles.avatar} to={`/${account}`}>
						<img src={author?.User?.avatar || fakeAvatar} />
						<div className={styles.line}></div>
					</Link>
					<div className={styles.infoSection}>
						<div className={styles.nameSection}>
							<div className={styles.nickname}>{author?.User?.name}</div>
							<div className={styles.accountAndPeriod}>
								@{author?.User?.account}．{author?.period}
							</div>
						</div>
						<div className={styles.contentSection}>{author?.description}</div>
						<div className={styles.replyTo}>
							回覆給&nbsp;<span>{author?.User?.account}</span>
						</div>
					</div>
				</div>
				<div className={styles.replySection}>
					<div className={styles.img}>
						<img src={userData?.avatar} />
					</div>
					<TextareaAutosize
						className={styles.inputReply}
						placeholder='推你的回覆'
						value={texts}
						onChange={onTextChange}
						autoFocus
					/>
				</div>
				<div className={styles.modalBottom}>
					<span>{prompts}</span>
					<button
						className={styles.replyButton}
						onClick={() => {
							onReplyClick(author?.id);
						}}
					>
						回覆
					</button>
				</div>
			</div>
		</div>
	);
}

export function Cover() {
	return <div className={styles.cover}></div>;
}

export default ReplyModal;
