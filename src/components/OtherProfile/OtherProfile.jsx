import fakeBack from '../../assets/user-fake-back.svg';
import fakePhoto from '../../assets/fake-photo.svg';
import bell from '../../assets/bell.svg';
import email from '../../assets/email.svg';
import styled from './OtherProfile.module.scss';
import { useState } from 'react';
import OtherTweetList from '../OtherTweetList/OtherTweetList';
import OtherReplyList from '../OtherReplyList/OtherReplyList';
// import { createContext } from 'react';

export function StatusButton({ buttonStatus, setButtonStatus }) {
	const handleTweetClick = (e) => {
		e.preventDefault();
		setButtonStatus('推文');
	};

	const handleReplyClick = (e) => {
		e.preventDefault();
		setButtonStatus('回覆');
	};

	const handleLikeClick = (e) => {
		e.preventDefault();
		setButtonStatus('喜歡的內容');
	};

	return (
		<div className={styled.statusButtonWrap}>
			<div className={buttonStatus === '推文' ? styled.buttonWrap : ''}>
				<button
					className={buttonStatus === '推文' ? styled.activeButton : styled.button}
					onClick={handleTweetClick}
				>
					推文
				</button>
			</div>

			<div className={buttonStatus === '回覆' ? styled.buttonWrap : ''}>
				<button
					className={buttonStatus === '回覆' ? styled.activeButton : styled.button}
					onClick={handleReplyClick}
				>
					回覆
				</button>
			</div>

			<div className={buttonStatus === '喜歡的內容' ? styled.buttonWrap : ''}>
				<button
					className={buttonStatus === '喜歡的內容' ? styled.activeButton : styled.button}
					onClick={handleLikeClick}
				>
					喜歡的內容
				</button>
			</div>
		</div>
	);
}

function UserContent({ userData, onFollowClick }) {
	const handleFollowStatus = (data) => {
		const result = data.isFollowed;
		return (data.isFollowed = !result);
	};
	return (
		<>
			<div className={styled.imgWrap}>
				<div>
					<img src={userData?.cover || fakeBack} alt='' className={styled.cover} />
				</div>

				<div className={styled.avatarCon}>
					<img src={userData?.avatar || fakePhoto} alt='' className={styled.avatar} />
				</div>
			</div>

			<div className={styled.userInfoWrap}>
				<>
					<div className={styled.functions}>
						<img src={bell} /> <img src={email} />
						<button
							onClick={() => {
								onFollowClick(userData.id);
								handleFollowStatus(userData);
							}}
							className={`${styled.followButton} ${
								userData?.isFollowed ? styled.following : styled.notFollowing
							}`}
						>
							{userData?.isFollowed ? '正在跟隨' : '跟隨'}
						</button>
					</div>
				</>

				<div className={styled.userInfo}>
					<span className={styled.title}>{userData?.name}</span>
					<span className={styled.account}>@{userData?.account}</span>

					<span>{userData?.introduction}</span>
				</div>

				<div className={styled.buttonWrap}>
					<div>
						<div className={styled.followButton}>
							<span>{userData?.followingCounts} 個</span>
							<span className={styled.followTitle}>跟隨中</span>
						</div>
					</div>

					<div>
						<div className={styled.followButton}>
							<span>{userData?.followerCounts} 位</span>
							<span className={styled.followTitle}>跟隨者</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function OtherProfile({
	activeSection,
	otherUserId,
	userTweets,
	userReplyTweets,
	userLikeTweets,
	onFollowClick,
	isFollowed,
}) {
	const [buttonStatus, setButtonStatus] = useState('推文');

	return (
		<div className={styled.wrap}>
			<UserContent
				userData={otherUserId}
				activeSection={activeSection}
				onFollowClick={onFollowClick}
				isFollowed={isFollowed}
			/>

			<StatusButton buttonStatus={buttonStatus} setButtonStatus={setButtonStatus} />

			<ul className={styled.ul}>
				{/* 判斷式:推文、回覆、喜歡的內容 */}
				{buttonStatus === '推文' && <OtherTweetList tweetList={userTweets} />}

				{buttonStatus === '回覆' && <OtherReplyList replies={userReplyTweets} />}

				{buttonStatus === '喜歡的內容' && <OtherTweetList tweetList={userLikeTweets} />}
			</ul>
		</div>
	);
}

export default OtherProfile;
