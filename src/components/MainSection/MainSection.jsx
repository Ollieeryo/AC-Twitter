import styles from './MainSection.module.scss';

import Header from '../Header/Header';
import TweetInput from '../TweetInput/TweetInput';
import UserProfile from '../UserProfile/UserProfile';
import SettingInput from '../SettingInput/SettingInput';
import FollowList from '../FollowList/FollowList';
import TweetList from '../TweetList/TweetList';
import ReplyPost from '../ReplyPost/ReplyPost';
import ReplyList from '../ReplyList/ReplyList';
import { useState } from 'react';
import { getAllReply } from '../../api/reply';
import { getIdTweets } from '../../api/tweets';
import { getUserData } from '../../api/userprofile';
import { useNavigate } from 'react-router-dom';
import ReplyModal from '../ReplyModal/ReplyModal';

function MainSection({ activeSection, setActiveSection, ToTweetModalHandler }) {
	const [tweetId, setTweetId] = useState();
	const [getTweet, setGetTweet] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [userData, setUserData] = useState();
	const navigate = useNavigate();

	const getUserAsync = async () => {
		try {
			const authToken = localStorage.getItem('authToken');
			const user = await getUserData(userData, authToken);
			if (!authToken) {
				navigate('/login');
				return;
			}
			setUserData(user);
		} catch (error) {
			console.error(error);
		}
	};
	getUserAsync();

	function handleToReplyModal() {
		setShowModal(true);
	}

	function handleModalClose() {
		setShowModal(false);
	}

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
				<TweetInput onToTweetClick={ToTweetModalHandler} self={userData} />
				<TweetList onTweetClick={handleTweetLink} onReplyClick={handleToReplyModal} />
			</>
		);
	}

	function ReplyPage() {
		const [replies, setReplies] = useState([]);

		const getTweetAsync = async () => {
			try {
				const authToken = localStorage.getItem('authToken');
				const aTweet = await getIdTweets(authToken, tweetId);
				if (!authToken) {
					navigate('/login');
					return;
				}
				setGetTweet(aTweet);
			} catch (error) {
				console.error(error);
			}
		};
		getTweetAsync();

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

		return (
			<>
				<ReplyPost tweet={getTweet} onReplyClick={handleToReplyModal} />
				<ReplyList replies={replies} />
			</>
		);
	}
	return (
		<div className={`${styles.container} ${showModal ? styles.showModal : styles.hideModal}`}>
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
			<div className={`${styles.replyModal} ${showModal ? styles.showModal : styles.hideModal}`}>
				<ReplyModal author={getTweet} self={userData} onCloseModal={handleModalClose} />
			</div>
		</div>
	);
}

export default MainSection;
