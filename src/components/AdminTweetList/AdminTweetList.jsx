// import xLogo from '../../assets/x-logo.svg';
import styled from './AdminTweetList.module.scss';
import reply from '../../assets/reply.svg';
import like from '../../assets/like.svg';
import React from 'react';
import { FollowButton } from '../FollowList/FollowList';

export function Button({ img }) {
	return <button className={styled.button}>{img}</button>;
}

export function AdminTweets({ userTweets, buttonStatus, activeSection, followingList }) {
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
										{activeSection === 'following' || activeSection === 'follower'
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
								{/* 追隨按鈕 */}
								<div className={styled.button}>
									{(activeSection === 'follower' || activeSection === 'following') && (
										<FollowButton tweetId={tweet.id} followingList={followingList} />
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
								{(buttonStatus === '推文' || buttonStatus === '喜歡的內容') && (
									<span>{tweet.description}</span>
								)}
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
										<img src={like} alt='' />
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

function AdminTweetList() {
	// const button = <Button img={<img src={xLogo} alt='' />} />;
	return (
		<div className={styled.tweetCon}>
			<ul className={styled.ul}>
				{/* <AdminTweets button={button} userTweets={adminTweets} /> */}
			</ul>
		</div>
	);
}

export default AdminTweetList;
