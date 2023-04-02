import styles from './Index.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import PopularList from '../../components/PopularList/PopularList';
import MainSection from '../../components/MainSection/MainSection';
import { useEffect, useState } from 'react';
import TweetModal from '../../components/TweetModal/TweetModal';
import { useNavigate } from 'react-router-dom';
import { getIdTweets, getTweets, postTweet } from '../../api/tweets';
import { getAllReply, postReply } from '../../api/reply';
import Swal from 'sweetalert2';
import ReplyModal from '../../components/ReplyModal/ReplyModal';
import { postLike, postUnlike } from '../../api/like';
import {
	getUserData,
	getUserLikeTweets,
	getUserReplyTweets,
	getUserTweets,
} from '../../api/userprofile';
import { addFollow, cancelFollow, getFollowingList } from '../../api/userprofile';

function Main() {
	const [activeSection, setActiveSection] = useState('main'); //顯示頁面
	const [tweets, setTweets] = useState([]); //推文清單
	const [showTweetModal, setShowTweetModal] = useState(false); //發推視窗
	const [userData, setUserData] = useState(); //使用者資料
	const [text, setText] = useState(''); //輸入文字
	const [prompt, setPrompt] = useState(''); //彈出視窗之文字提示
	const [getTweet, setGetTweet] = useState([]); //取得點擊之推文
	const [replies, setReplies] = useState([]); //取得點擊之推文回覆清單
	const [showReplyModal, setShowReplyModal] = useState(false); //發回覆視窗
	const [replyText, setReplyText] = useState(''); //輸入回覆文字
	const navigate = useNavigate();
	// 以下為處理OtherProfile之state
	const [otherUserData, setOtherUserData] = useState([]); //其它使用者資料
	const [userTweets, setUserTweets] = useState([]);
	const [userReplyTweets, setUserReplyTweets] = useState([]);
	const [userLikeTweets, setUserLikeTweets] = useState([]);
	const [isFollowed, setIsFollowed] = useState(false);

	// 追蹤功能
	const handleFollowToggle = async (otherUserId) => {
		setIsFollowed(!isFollowed);
		try {
			const authToken = localStorage.getItem('authToken');
			if (!authToken) {
				navigate('/login');
				return;
			}
			const userLoginID = localStorage.getItem('userId');
			const followingList = await getFollowingList(userLoginID, authToken);
			if (followingList.some((popular) => popular.id === otherUserId)) {
				cancelFollow(otherUserId, authToken);
				console.log('userLoginID, in cancelfollow', userLoginID);
			} else {
				addFollow(otherUserId, authToken);
				console.log('userLoginID, in addlfollow', userLoginID);
			}
			// setOtherUserData(otherUserId);
			// const variant = followingList?.filter((f) => f.id === otherUserId)[0].isFollowed;
			// console.log(variant);
		} catch (error) {
			console.error(error);
		}
	};

	// 獲取其它使用者個人資料
	const fetchOtherUserData = async (otherUserId) => {
		try {
			const authToken = localStorage.getItem('authToken');
			if (!authToken) {
				navigate('/login');
				return;
			}
			// 個人資料
			const data = await getUserData(otherUserId, authToken);
			setOtherUserData(data);
			console.log('otherUserData=', otherUserData);

			// 個人推文
			const tweets = await getUserTweets(otherUserId, authToken);
			setUserTweets(tweets);

			// 個人回覆推文
			const replyTweets = await getUserReplyTweets(otherUserId, authToken);
			setUserReplyTweets(replyTweets);

			// 個人喜歡推文
			const likeTweets = await getUserLikeTweets(otherUserId, authToken);
			setUserLikeTweets(likeTweets);
		} catch (error) {
			console.error(error);
		}
	};

	// 點擊他人頭像和名字之連結
	function handleOtherClick(otherUserId) {
		console.log('userData=', userData.id);
		console.log('otherUserId=', otherUserId);

		if (otherUserId === userData.id) {
			setActiveSection('userProfile');
		} else {
			setActiveSection('otherProfile');
			fetchOtherUserData(otherUserId);
		}
	}

	// 前往發推視窗
	function handleToTweetModal() {
		setText('');
		setPrompt('');
		setShowTweetModal(true);
	}

	// 前往發推視窗
	function handleTweetModalClose() {
		setShowTweetModal(false);
	}

	// 處理推文輸入改變
	const handleTweetTextChange = (e) => {
		const texts = e.target.value;
		setText(texts);
		if (text.length > 140) {
			setPrompt('字數不可超過 140 字');
		} else {
			setPrompt('');
		}
	};

	// 點擊新增推文按鈕
	const handlePostTweetClick = async () => {
		if (text.length === 0) {
			setPrompt('內容不可空白');
		} else if (text.length > 140) {
			setPrompt('字數不可超過 140 字');
		} else {
			setPrompt('');
			const authToken = localStorage.getItem('authToken');
			if (!authToken) {
				navigate('/login');
				return;
			}
			await postTweet(text, authToken);
			// SweetAlert推文發送成功訊息
			Swal.fire({
				position: 'top',
				title: '推文發送成功',
				timer: 1000,
				icon: 'success',
				showConfirmButton: false,
			}).then(() => {
				handleTweetModalClose();
			});
		}
	};

	// 點擊推文，取得推文id，連結至個別推文回覆畫面
	const handleTweetLink = (tweetID) => {
		console.log(`Tweet ID: ${tweetID}`);
		// setTweetId(tweetID);
		setActiveSection('reply');
		handleGetIdTweet(tweetID);
		handleGetAllReply(tweetID);
	};
	//取得個別推文內容
	const handleGetIdTweet = async (tweetID) => {
		try {
			const authToken = localStorage.getItem('authToken');
			const aTweet = await getIdTweets(authToken, tweetID);
			setGetTweet(aTweet);
		} catch (error) {
			console.error(error);
		}
	};
	//進入個別推文回覆畫面時，取得該推文之回覆清單
	const handleGetAllReply = async (tweetID) => {
		try {
			const authToken = localStorage.getItem('authToken');
			const allReply = await getAllReply(authToken, tweetID);
			setReplies(allReply);
		} catch (error) {
			console.error(error);
		}
	};
	// 打開replymodal，取得個別推文內容
	const handleToReplyModal = async (tweetID) => {
		setReplyText('');
		setPrompt('');
		setShowReplyModal(true);
		try {
			const authToken = localStorage.getItem('authToken');
			const theTweet = await getIdTweets(authToken, tweetID);
			setGetTweet(theTweet);
		} catch (error) {
			console.error(error);
		}
	};

	function handleReplyModalClose() {
		setShowReplyModal(false);
	}

	// 處理reply輸入改變
	const handleTextChange = (e) => {
		const texts = e.target.value;
		setReplyText(texts);
		console.log(prompt);
		if (texts.length > 140) {
			setPrompt('字數不可超過 140 字');
		} else {
			setPrompt('');
		}
	};

	//點擊回覆按鈕，新增回覆
	const handleReplyClick = async (tweetID) => {
		if (replyText.length === 0) {
			setPrompt('內容不可空白');
		} else if (replyText.length > 140) {
			setPrompt('字數不可超過 140 字');
		} else {
			setPrompt('');
			const authToken = localStorage.getItem('authToken');
			await postReply(authToken, replyText, tweetID);
			setReplyText('');
			Swal.fire({
				position: 'top',
				title: '回覆發送成功',
				timer: 1000,
				icon: 'success',
				showConfirmButton: false,
			}).then(() => {
				handleReplyModalClose();
			});
		}
	};

	// 在推文清單上按喜歡
	const handleLikeClick = async (itemID) => {
		try {
			const authToken = localStorage.getItem('authToken');
			// console.log('like', like);

			setTweets(
				tweets.map((item) => {
					if (item.id === itemID) {
						if (item.isLiked === false) {
							postLike(authToken, itemID);
							return {
								...item,
								likeCounts: item.likeCounts + 1,
								isLiked: !item.isLiked,
							};
						} else {
							postUnlike(authToken, itemID);
							return {
								...item,
								likeCounts: item.likeCounts - 1,
								isLiked: !item.isLiked,
							};
						}
					} else {
						return item;
					}
				}),
			);
		} catch (error) {
			console.log('Error:', error.message);
		}
	};
	// 進入首頁，先驗證，通過後載入TweetList
	useEffect(() => {
		const getTweetsAsync = async () => {
			try {
				const userId = localStorage.getItem('userId');
				const authToken = localStorage.getItem('authToken');
				const tweet = await getTweets(authToken);
				const data = await getUserData(userId, authToken);
				setUserData(data);

				if (!authToken) {
					navigate('/login');
					return;
				}
				setTweets(tweet.map((tweet) => ({ ...tweet })));
			} catch (error) {
				console.error(error);
			}
		};
		getTweetsAsync();
	}, []);

	return (
		<div
			className={`${styles.container} ${
				showTweetModal || showReplyModal ? styles.showModal : styles.hideModal
			}`}
		>
			<div className={styles.sidebarSection}>
				<Sidebar setActiveSection={setActiveSection} onToTweetClick={handleToTweetModal} />
			</div>
			<div className={styles.mainSection}>
				<MainSection
					activeSection={activeSection}
					setActiveSection={setActiveSection}
					ToTweetModalHandler={handleToTweetModal}
					onTweetLink={handleTweetLink}
					tweetAuth={getTweet}
					replyList={replies}
					User={userData}
					onToReplyModal={handleToReplyModal}
					onLike={handleLikeClick}
					tweets={tweets}
					onOtherClick={handleOtherClick}
					otherUserID={otherUserData}
					userTweets={userTweets}
					userReplyTweets={userReplyTweets}
					userLikeTweets={userLikeTweets}
					otherUserData={otherUserData}
					OtherUserTweets={userTweets}
					onFollowClick={handleFollowToggle}
					isFollowed={isFollowed}
				/>
			</div>
			<div className={styles.popularListSection}>
				<PopularList onOtherClick={handleOtherClick} onFollowToggle={handleFollowToggle} />
			</div>
			<div
				className={`${styles.tweetModal} ${showTweetModal ? styles.showModal : styles.hideModal}`}
			>
				<TweetModal
					userData={userData}
					onCloseModal={handleTweetModalClose}
					onPostTweetClick={handlePostTweetClick}
					onTextChange={handleTweetTextChange}
					texts={text}
					prompts={prompt}
				/>
			</div>
			<div
				className={`${styles.replyModal} ${showReplyModal ? styles.showModal : styles.hideModal}`}
			>
				<ReplyModal
					author={getTweet}
					userData={userData}
					onReplyClick={handleReplyClick}
					onCloseModal={handleReplyModalClose}
					onTextChange={handleTextChange}
					prompts={prompt}
				/>
			</div>
		</div>
	);
}

export default Main;
