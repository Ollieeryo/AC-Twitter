import styles from './ReplyModal.module.scss';
import Main from '../../pages/Main/Index';
import TextareaAutosize from 'react-textarea-autosize';

import IconX from '../../assets/X-icon.svg';
import manAvatar from '../../assets/manAvatar.svg';
import fakeAvatar from '../../assets/fake-avatar.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { postReply } from '../../api/reply';

function ReplyModal() {
	const [text, setText] = useState('');
	const [prompt, setPrompt] = useState('');
	const [reply, setReply] = useState([]);

	// 新增推文資料
	const handleAddReply = async () => {
		try {
			const data = await postReply();

			setReply((prevReplies) => {
				return [
					...prevReplies,
					{
						id: data.id,
						UserId: data.UserId,
						comment: data.text,
						updatedAt: data.updatedAt,
						createdAt: data.createdAt,
					},
				];
			});
			console.log(reply);
			setText('');
		} catch (error) {
			console.error(error);
		}
	};

	function handleReplyClick() {
		if (text.length === 0) {
			setPrompt('內容不可空白');
		} else if (text.length > 140) {
			setPrompt('字數不可超過 140 字');
		} else {
			setPrompt('');
			handleAddReply;
			Swal.fire('回覆發送成功', '', 'success').then(() => {
				window.history.back();
			});
		}
	}
	return (
		<div className={styles.container}>
			<Cover />
			<Modal accountName='@apple' onClick={handleReplyClick} prompts={prompt} />
			<Main />
		</div>
	);
}

export function Cover() {
	return <div className={styles.cover}></div>;
}

function Modal({ accountName, handleReplyClick, prompts }) {
	return (
		<div className={styles.replyModalContainer}>
			<div className={styles.modalHead}>
				<Link className={styles.iconX} to='/'>
					<img src={IconX} />
				</Link>
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
			<div className={styles.modalBottom}>
				<span>{prompts}</span>
				<button className={styles.tweetButton} onClick={handleReplyClick}>
					回覆
				</button>
			</div>
		</div>
	);
}

export default ReplyModal;
