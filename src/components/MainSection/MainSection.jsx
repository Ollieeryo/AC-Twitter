import styles from './MainSection.module.scss';

import Header from '../Header/Header';
import TweetInput from '../TweetInput/TweetInput';
import UserProfile from '../UserProfile/UserProfile';
import SettingInput from '../SettingInput/SettingInput';
import FollowList from '../FollowList/FollowList';
import TweetList from '../TweetList/TweetList';
import ReplyPost from '../ReplyPost/ReplyPost';
import ReplyList from '../ReplyList/ReplyList';
import OtherProfile from '../OtherProfile/OtherProfile';

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
	onOtherClick,
	otherUserID,
	userTweets,
	userReplyTweets,
	userLikeTweets,
	otherUserData,
	OtherUserTweets,
	onFollowClick,
	isFollowed,
	onTweetLikeClick,
}) {
	function HomePage() {
		return (
			<>
				<TweetInput
					onToTweetClick={ToTweetModalHandler}
					onTextChange={onText}
					userData={User}
					onOtherClick={onOtherClick}
				/>
				<TweetList
					onTweetClick={onTweetLink}
					onReplyClick={onToReplyModal}
					onLikeClick={onLike}
					tweetList={tweets}
					onOtherClick={onOtherClick}
				/>
			</>
		);
	}

	function ReplyPage() {
		return (
			<>
				<ReplyPost
					tweet={tweetAuth}
					onReplyClick={onToReplyModal}
					onLikeClick={onTweetLikeClick}
					onOtherClick={onOtherClick}
				/>
				<ReplyList replies={replyList} onOtherClick={onOtherClick} />
			</>
		);
	}
	return (
		<div className={styles.container}>
			<Header
				activeSection={activeSection}
				setActiveSection={setActiveSection}
				otherUserData={otherUserData}
				OtherUserTweets={OtherUserTweets}
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

			{/* OtherProfile */}
			{activeSection === 'otherProfile' && (
				<OtherProfile
					activeSection={activeSection}
					otherUserId={otherUserID}
					userTweets={userTweets}
					userReplyTweets={userReplyTweets}
					userLikeTweets={userLikeTweets}
					onFollowClick={onFollowClick}
					isFollowed={isFollowed}
				/>
			)}
		</div>
	);
}

export default MainSection;
