import styles from './MainSection.module.scss';

import Header from '../Header/Header';
import TweetInput from '../TweetInput/TweetInput';
import UserProfile from '../UserProfile/UserProfile';
import SettingInput from '../SettingInput/SettingInput';
import FollowList from '../FollowList/FollowList';
import TweetList from '../TweetList/TweetList';
import ReplyPost from '../ReplyPost/ReplyPost';
import ReplyList from '../ReplyList/ReplyList';

function MainSection({
	activeSection,
	setActiveSection,
	ToTweetModalHandler,
	onToReplyModal,
	tweetAuth,
	User,
	replyList,
	onTweetLink,
	onLike,
	onText,
	tweets,
}) {
	function HomePage() {
		return (
			<>
				<TweetInput onToTweetClick={ToTweetModalHandler} onTextChange={onText} userData={User} />
				<TweetList
					onTweetClick={onTweetLink}
					onReplyClick={onToReplyModal}
					onLikeClick={onLike}
					tweetList={tweets}
				/>
			</>
		);
	}

	function ReplyPage() {
		return (
			<>
				<ReplyPost tweet={tweetAuth} onReplyClick={onToReplyModal} />
				<ReplyList replies={replyList} />
			</>
		);
	}
	return (
		<div className={styles.container}>
			<Header activeSection={activeSection} />

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
