import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFollow, cancelFollow, getFollowedList, getFollowingList } from '../../api/userprofile';
import { AdminTweets } from '../AdminTweetList/AdminTweetList';
import styled from './FollowList.module.scss';

export function FollowButton({ tweetId, followingList, setFollowingList, setFollowedList }) {
	const following = followingList.find((item) => item.id === tweetId);
	const isNotFollow = typeof following === 'undefined' || !following;
	const [follow, setFollow] = useState(following);

	// 處理新增追隨按鈕
	const handleFollow = async () => {
		try {
			const authToken = localStorage.getItem('authToken');
			const userId = tweetId;
			const userId2 = localStorage.getItem('userId');

			// 追隨API
			if (isNotFollow) {
				await addFollow(userId, authToken);

				setFollow(true);

				// 更新追隨者畫面
				const followed = await getFollowedList(userId2, authToken);
				setFollowedList(followed);
				// 更新正在追隨畫面
				const following = await getFollowingList(userId2, authToken);
				setFollowingList(following);
				return;
			}

			// 取消追蹤API
			if (following) {
				await cancelFollow(userId, authToken);

				setFollow(false);

				// 更新追隨者畫面
				const followed = await getFollowedList(userId2, authToken);
				setFollowedList(followed);
				// 更新正在追隨畫面
				const following = await getFollowingList(userId2, authToken);
				setFollowingList(following);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<button
			className={follow ? styled.followingButton : styled.followButton}
			onClick={handleFollow}
		>
			{follow ? '正在跟隨' : '跟隨'}
		</button>
	);
}

function FollowList({ activeSection, setActiveSection }) {
	const navigate = useNavigate();
	const [followedList, setFollowedList] = useState([]);
	const [followingList, setFollowingList] = useState([]);
	const authToken = localStorage.getItem('authToken');
	const userId = localStorage.getItem('userId');

	const handleFollowerClick = (e) => {
		e.preventDefault();
		setActiveSection('follower');
	};

	const handleFollowingClick = (e) => {
		e.preventDefault();
		setActiveSection('following');
	};

	useEffect(() => {
		const fetchFollowData = async () => {
			try {
				if (!authToken) {
					navigate('/login');
					return;
				}

				// 獲取追隨者資料
				const followed = await getFollowedList(userId, authToken);
				setFollowedList(followed);

				// 獲取正在追隨資料
				const following = await getFollowingList(userId, authToken);
				setFollowingList(following);
			} catch (error) {
				console.error(error);
			}
		};
		fetchFollowData();
	}, []);

	return (
		<div>
			{/* 追隨者、正在追隨按鈕 */}
			<div className={styled.statusButtonWrap}>
				<div className={activeSection === 'follower' ? styled.buttonWrap : ''}>
					<button
						className={activeSection === 'follower' ? styled.activeButton : styled.button}
						onClick={handleFollowerClick}
					>
						追隨者
					</button>
				</div>

				<div className={activeSection === 'following' ? styled.buttonWrap : ''}>
					<button
						className={activeSection === 'following' ? styled.activeButton : styled.button}
						onClick={handleFollowingClick}
					>
						正在追隨
					</button>
				</div>
			</div>

			<div>
				{/* 追隨者 */}
				{activeSection === 'follower' && (
					<div>
						<ul className={styled.ul}>
							<AdminTweets
								userTweets={followedList}
								activeSection={activeSection}
								followingList={followingList}
								setFollowingList={setFollowingList}
								setFollowedList={setFollowedList}
							/>
						</ul>
					</div>
				)}

				{/* 正在追隨 */}
				{activeSection === 'following' && (
					<div>
						<ul className={styled.ul}>
							<AdminTweets
								userTweets={followingList}
								activeSection={activeSection}
								followingList={followingList}
								setFollowingList={setFollowingList}
								setFollowedList={setFollowedList}
							/>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

export default FollowList;
