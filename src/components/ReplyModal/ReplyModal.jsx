import styles from './ReplyModal.module.scss';
import TextareaAutosize from 'react-textarea-autosize';

import IconX from '../../assets/X-icon.svg';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { postReply } from '../../api/reply';
import { Link, useNavigate } from 'react-router-dom';

function ReplyModal({ onCloseModal, author, self }) {
	const [text, setText] = useState('');
	const [prompt, setPrompt] = useState('');
	const [reply, setReply] = useState([]);
	const navigate = useNavigate();

	const handleTextChange = (e) => {
		const text = e.target.value;
		setText(text);
		if (text.length > 140) {
			setPrompt('字數不可超過 140 字');
		} else {
			setPrompt('');
		}
	};

	// 新增回覆
	const handleAddReply = async () => {
		try {
			const authToken = localStorage.getItem('authToken');
			if (!authToken) {
				navigate('/login');
				return;
			}
			const newReply = {
				description: text,
			};
			const response = await postReply(authToken, newReply);
			setReply([response, ...reply]);
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
			handleAddReply();
			Swal.fire({
				position: 'top',
				title: '回覆發送成功',
				timer: 1000,
				icon: 'success',
				showConfirmButton: false,
			}).then(() => {
				window.history.back();
			});
		}
	}
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
					<Link className={styles.avatar} to={`/${author?.User?.account}`}>
						<img src={author?.User?.avatar} />
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
						<img src={self?.avatar} />
					</div>
					<TextareaAutosize
						className={styles.inputTweet}
						placeholder='推你的回覆'
						onChange={handleTextChange}
						autoFocus
					/>
				</div>
				<div className={styles.modalBottom}>
					<span>{prompt}</span>
					<button className={styles.tweetButton} onClick={handleReplyClick}>
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
