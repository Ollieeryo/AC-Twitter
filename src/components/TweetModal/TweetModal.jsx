import styles from './TweetModal.module.scss';
import Main from '../../pages/Main/Index';

import TextareaAutosize from 'react-textarea-autosize';
import Swal from 'sweetalert2';

import IconX from '../../assets/X-icon.svg';
import manAvatar from '../../assets/manAvatar.svg';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { postTweet } from '../../api/tweets';
// import { useEffect } from 'react';

function TweetModal() {
	return (
		<div className={styles.container}>
			<Cover />
			<Modal />
			<Main />
		</div>
	);
}

export function Cover() {
	return <div className={styles.cover}></div>;
}

function Modal() {
	const [text, setText] = useState('');
	const [prompt, setPrompt] = useState('');
	const [tweets, setTweets] = useState([]);

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
	const handleAddTweet = async () => {
		try {
			const data = await postTweet({
				description: text,
			});

			setTweets((prevTweets) => {
				return [
					...prevTweets,
					{
						id: data.id,
						UserId: data.UserId,
						description: data.description,
						updatedAt: data.updatedAt,
						createdAt: data.createdAt,
					},
				];
			});
			console.log(tweets);
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
			handleAddTweet;
			// SweetAlert推文發送成功訊息
			Swal.fire('推文發送成功', '', 'success').then(() => {
				window.location.href = '/home';
			});
		}
	}
	// 還沒寫
	// useEffect(() => {
	// 	const getTodosAsync = async () => {
	// 		try {
	// 			const todos = await getTodos();

	// 			setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};
	// 	getTodosAsync();
	// }, []);

	// useEffect(() => {
	// 	if (!isAuthenticated) {
	// 		navigate('/login');
	// 	}
	// }, [navigate, isAuthenticated]);

	return (
		<div className={styles.tweetModalContainer}>
			<div className={styles.tweetModal}>
				<div className={styles.modalHead}>
					<Link className={styles.iconX} to='/'>
						<img src={IconX} />
					</Link>
				</div>
				<div className={styles.section}>
					<Link className={styles.img} to=''>
						<img src={manAvatar} />
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
					</button>{' '}
				</div>
			</div>
		</div>
	);
}

export default TweetModal;
