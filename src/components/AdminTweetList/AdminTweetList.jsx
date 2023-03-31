import xLogo from '../../assets/x-logo.svg';
import styled from './AdminTweetList.module.scss';
import reply from '../../assets/reply.svg';
import like from '../../assets/like.svg';
import redLike from '../../assets/redLike.svg';
import React from 'react';
import { FollowButton } from '../FollowList/FollowList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTweets, getAllTweets } from '../../api/admin';
import { useState } from 'react';

export function XButton({ img, tweetId, setAllTweets }) {
	const handleDeleteTweet = async () => {
		const authToken = localStorage.getItem('adminAuthToken');
		await deleteTweets(tweetId, authToken);

		const result = await getAllTweets(authToken);
		setAllTweets(result);
	};

	return (
		<button className={styled.button} onClick={handleDeleteTweet}>
			{img}
		</button>
	);
}

export function AdminTweets({
	userTweets,
	buttonStatus,
	activeSection,
	followingList,
	activeComponent,
	setAllTweets,
	setFollowingList,
	setFollowedList,
}) {
	return (
		// 用 map 渲染
		userTweets.map((tweet) => {
			return (
				<li key={tweet.id} id={tweet.id}>
					<div className={styled.tweetsWrap}>
						<div className={styled.logoWrap}>
							<img
								className={styled.logo}
								src={
									activeSection === 'following' || activeSection === 'follower'
										? tweet.avatar
										: tweet.User.avatar
								}
								alt=''
							/>
						</div>

						<div className={styled.userWrap}>
							{/* 帳號資料 */}
							<div className={styled.userInfo}>
								<div className={styled.userInfoCon}>
									<span className={styled.userName}>
										{activeSection === 'following' ||
										activeSection === 'follower' ||
										activeComponent === 'tweets'
											? tweet.name
											: tweet.User.name}
									</span>
									{/* 追隨者、正在追隨不顯示 */}

									<span className={styled.userTime}>
										{activeSection === 'following' || activeSection === 'follower'
											? ''
											: `@ ${tweet.User.account}・${tweet.period}`}
									</span>
								</div>
								{/* 追隨按鈕、後台刪除推文按鈕 */}
								<div className={styled.button}>
									{(activeSection === 'follower' || activeSection === 'following') && (
										<FollowButton
											tweetId={tweet.id}
											followingList={followingList}
											setFollowingList={setFollowingList}
											setFollowedList={setFollowedList}
										/>
									)}
									{activeComponent === 'tweets' && (
										<XButton
											img={<img src={xLogo} alt='' />}
											tweetId={tweet.id}
											setAllTweets={setAllTweets}
										/>
									)}
								</div>
							</div>

							{/* 回覆狀態 */}
							{buttonStatus === '回覆' && (
								<div className={styled.replyAccWrap}>
									<span className={styled.text}>回覆</span>
									<span className={styled.account}>
										{buttonStatus === '回覆' ? `@${tweet.Tweet.User.account}` : ''}
									</span>
								</div>
							)}

							{/* 推文 */}
							<div className={styled.tweetWrap}>
								{(buttonStatus === '推文' ||
									buttonStatus === '喜歡的內容' ||
									activeComponent === 'tweets') && <span>{tweet.description}</span>}
								{buttonStatus === '回覆' && <span>{tweet.comment}</span>}

								{(activeSection === 'followed' || activeSection === 'following') && (
									<span>{tweet.introduction}</span>
								)}
							</div>

							{/* 推文、喜歡狀態 */}
							{(buttonStatus === '推文' || buttonStatus === '喜歡的內容') && (
								<div className={styled.replyLikeWrap}>
									<div className={styled.replyWrap}>
										<div>
											<img src={reply} alt='' />
										</div>
										<div>
											<span>{tweet.replyCounts}</span>
										</div>
									</div>

									<div className={styled.replyWrap}>
										<img src={buttonStatus === '喜歡的內容' ? redLike : like} alt='' />
										{tweet.likeCounts}
									</div>
								</div>
							)}
						</div>
					</div>
				</li>
			);
		})
	);
}

function AdminTweetList({ activeComponent, tweetId }) {
	const navigate = useNavigate();
	const [allTweets, setAllTweets] = useState([]);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const authToken = localStorage.getItem('adminAuthToken');

				if (!authToken) {
					navigate('/admin');
					return;
				}

				const result = await getAllTweets(authToken);
				setAllTweets(result);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUserData();
	}, []);

	return (
		<div className={styled.tweetCon}>
			<ul className={styled.ul}>
				<AdminTweets
					userTweets={allTweets}
					activeComponent={activeComponent}
					tweetId={tweetId}
					setAllTweets={setAllTweets}
				/>
			</ul>
		</div>
	);
}

export default AdminTweetList;
