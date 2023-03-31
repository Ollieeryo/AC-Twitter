import styles from './TweetModal.module.scss';

import TextareaAutosize from 'react-textarea-autosize';
import Swal from 'sweetalert2';

import IconX from '../../assets/X-icon.svg';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postTweet } from '../../api/tweets';

export function TweetModal({ onCloseModal, self }) {
	const [text, setText] = useState('');
	const [prompt, setPrompt] = useState('');
	const [tweets, setTweets] = useState([]);
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

	// 新增推文資料
	const handlePostTweet = async () => {
		try {
			const authToken = localStorage.getItem('authToken');
			if (!authToken) {
				navigate('/login');
				return;
			}
			const newTweet = {
				description: text,
			};
			const response = await postTweet(authToken, newTweet);
			setTweets([response, ...tweets]);
			setText('');
		} catch (error) {
			console.error(error);
		}
	};

	function handleTweetClick() {
		if (text.length === 0) {
			setPrompt('內容不可空白');
		} else if (text.length > 140) {
			setPrompt('字數不可超過 140 字');
		} else {
			setPrompt('');
			handlePostTweet();
			// SweetAlert推文發送成功訊息
			Swal.fire({
				position: 'top',
				title: '推文發送成功',
				timer: 1000,
				icon: 'success',
				showConfirmButton: false,
			}).then(() => {
				window.location.href = '';
			});
		}
	}

	return (
		<div className={styles.container}>
			<Cover />
			<div className={styles.tweetModalContainer}>
				<div className={styles.tweetModal}>
					<div className={styles.modalHead}>
						<div className={styles.iconX} onClick={onCloseModal}>
							<img src={IconX} />
						</div>
					</div>
					<div className={styles.section}>
						<Link className={styles.img} to=''>
							<img src={self?.avatar} />
						</Link>

						<TextareaAutosize
							className={styles.inputTweet}
							placeholder='有什麼新鮮事？'
							autoFocus
							onChange={handleTextChange}
						/>
					</div>
					<div className={styles.modalBottom}>
						<span>{prompt}</span>
						<button className={styles.tweetButton} onClick={handleTweetClick}>
							推文
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function Cover() {
	return <div className={styles.cover}></div>;
}

export default TweetModal;
