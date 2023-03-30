import styles from './MainSection.module.scss';

import Header from '../Header/Header';
import TweetInput from '../TweetInput/TweetInput';
import TweetList from '../TweetList/TweetList';
import ReplyPost from '../ReplyPost/ReplyPost';
import ReplyList from '../ReplyList/ReplyList';
import { useEffect, useState } from 'react';
import { getAllReply } from '../../api/reply';
import { getIdTweets } from '../../api/tweets';

function MainSection() {
	const [currentPage, setCurrentPage] = useState('home');
	const [tweetId, setTweetId] = useState();

	const handleTweetLink = (tweetID) => {
		console.log(`Tweet ID: ${tweetID}`);
		setCurrentPage(`${tweetID}`);
		setTweetId(tweetID);
	};

	function HomePage() {
		return (
			<>
				<Header content='首頁' />
				<TweetInput />
				<TweetList onTweetClick={handleTweetLink} />
			</>
		);
	}

	function ReplyPage() {
		const [replies, setReplies] = useState([]);
		const [getTweet, setGetTweet] = useState([]);

		useEffect(() => {
			const getTweetAsync = async () => {
				try {
					const authToken = localStorage.getItem('authToken');
					const aTweet = await getIdTweets(authToken, tweetId);
					console.log(aTweet);
					setGetTweet(aTweet);
				} catch (error) {
					console.error(error);
				}
			};
			getTweetAsync();
		}, []);

		useEffect(() => {
			const getRepliesAsync = async () => {
				try {
					const authToken = localStorage.getItem('authToken');
					const reply = await getAllReply(authToken, tweetId);

					setReplies(reply.map((reply) => ({ ...reply })));
				} catch (error) {
					console.error(error);
				}
			};
			getRepliesAsync();
		}, []);

		return (
			<>
				<Header content='推文' />
				<ReplyPost tweet={getTweet} />
				<ReplyList replies={replies} />
			</>
		);
	}

	return (
		<div className={styles.container}>{currentPage === 'home' ? <HomePage /> : <ReplyPage />}</div>
	);
}

export default MainSection;
