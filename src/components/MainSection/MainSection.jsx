import styles from './MainSection.module.scss';

import Header from '../Header/Header';
import TweetInput from '../TweetInput/TweetInput';
import UserProfile from '../UserProfile/UserProfile';
import SettingInput from '../SettingInput/SettingInput';
import FollowList from '../FollowList/FollowList';
import TweetList from '../TweetList/TweetList';
import ReplyPost from '../ReplyPost/ReplyPost';
import ReplyList from '../ReplyList/ReplyList';
import { useEffect, useState } from 'react';
import { getAllReply } from '../../api/reply';
import { getIdTweets } from '../../api/tweets';

function MainSection({ activeSection, setActiveSection }) {
	const [tweetId, setTweetId] = useState();

	function handleArrowClick() {
		window.location.href = '/home';
	}

	const handleTweetLink = (tweetID) => {
		console.log(`Tweet ID: ${tweetID}`);
		setTweetId(tweetID);
		setActiveSection('reply');
	};

	function HomePage() {
		return (
			<>
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
				<ReplyPost tweet={getTweet} />
				<ReplyList replies={replies} />
			</>
		);
	}
	return (
		<div className={styles.container}>
			<Header
				activeSection={activeSection}
				onArrowClick={() => {
					handleArrowClick();
				}}
			/>

			{/* Main */}
			{activeSection === 'main' && <HomePage />}

			{/* ReplyPage */}
			{activeSection === 'reply' && <ReplyPage />}

			{/* UserProfile */}
			{activeSection === 'userProfile' && (
				<UserProfile activeSection={activeSection} setActiveSection={setActiveSection} />
			)}

			{/* Setting */}
			{activeSection === 'setting' && <SettingInput />}

			{/* followList */}
			{(activeSection === 'follower' || activeSection === 'following') && (
				<FollowList activeSection={activeSection} setActiveSection={setActiveSection} />
			)}
		</div>
	);
}

export default MainSection;
