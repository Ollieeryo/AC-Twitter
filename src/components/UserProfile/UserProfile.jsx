import fakeBack from '../../assets/user-fake-back.svg';
import fakePhoto from '../../assets/fake-photo.svg';
import styled from './UserProfile.module.scss';
import Modal from 'react-modal';
import { useState } from 'react';
import { ReactComponent as XLogo } from '../../assets/x-logo.svg';
import camera from '../../assets/camera.svg';
import { useAuthLogin } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AdminTweets } from '../AdminTweetList/AdminTweetList';
import {
	getEditPersonal,
	getUserData,
	getUserLikeTweets,
	getUserReplyTweets,
	getUserTweets,
} from '../../api/userprofile';
import Swal from 'sweetalert2';
import { useRef } from 'react';

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

export function UserContent({
	activeSection,
	userData,
	modalIsOpen,
	setModalIsOpen,
	handleEditProfile,
	handleFollowerClick,
	handleFollowingClick,
}) {
	return (
		<>
			<div className={styled.imgWrap}>
				<div>
					<img src={userData.cover || fakeBack} alt='' className={styled.cover} />
				</div>

				<div className={styled.avatarCon}>
					<img src={userData.avatar || fakePhoto} alt='' className={styled.avatar} />
				</div>
			</div>

			<div className={styled.userInfoWrap}>
				{activeSection === 'userProfile' && (
					<>
						<div className={styled.edit}>
							<button className={styled.editButton} onClick={handleEditProfile}>
								編輯個人資料
							</button>
						</div>

						<ReactModal
							modalIsOpen={modalIsOpen}
							setModalIsOpen={setModalIsOpen}
							userData={userData}
						/>
					</>
				)}

				<div className={styled.userInfo}>
					<span className={styled.title}>{userData.name}</span>
					<span className={styled.account}>@{userData.account}</span>

					<span>{userData.introduction}</span>
				</div>

				<div className={styled.buttonWrap}>
					<div>
						<button className={styled.followButton} onClick={handleFollowingClick}>
							<span>{userData.followingCounts} 個</span>
							<span className={styled.followTitle}>跟隨中</span>
						</button>
					</div>

					<div>
						<button className={styled.followButton} onClick={handleFollowerClick}>
							<span>{userData.followerCounts} 位</span>
							<span className={styled.followTitle}>跟隨者</span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

function UserProfile({ activeSection, setActiveSection }) {
	const {
		userData,
		setUserData,
		userTweets,
		setUserTweets,
		userReplyTweets,
		setUserReplyTweets,
		userLikeTweets,
		setUserLikeTweets,
		buttonStatus,
		setButtonStatus,
	} = useAuthLogin();
	const navigate = useNavigate();
	const [modalIsOpen, setModalIsOpen] = useState(false);

	// Modal
	const handleEditProfile = () => {
		setModalIsOpen(true);
	};

	// 跟隨者按鈕
	const handleFollowerClick = (e) => {
		e.preventDefault();
		setActiveSection('follower');
	};

	// 跟隨中按鈕
	const handleFollowingClick = (e) => {
		e.preventDefault();
		setActiveSection('following');
	};

	// 獲取使用者個人資料
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const authToken = localStorage.getItem('authToken');
				const userId = localStorage.getItem('userId');
				if (!authToken) {
					navigate('/login');
					return;
				}
				// 個人資料
				const data = await getUserData(userId, authToken);
				setUserData(data);

				// 個人推文
				const tweets = await getUserTweets(userId, authToken);
				setUserTweets(tweets);

				// 個人回覆推文
				const replyTweets = await getUserReplyTweets(userId, authToken);
				setUserReplyTweets(replyTweets);

				// 個人喜歡推文
				const likeTweets = await getUserLikeTweets(userId, authToken);
				setUserLikeTweets(likeTweets);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUserData();
	}, []);

	return (
		<div className={styled.wrap}>
			<UserContent
				userData={userData}
				modalIsOpen={modalIsOpen}
				setModalIsOpen={setModalIsOpen}
				handleEditProfile={handleEditProfile}
				handleFollowerClick={handleFollowerClick}
				handleFollowingClick={handleFollowingClick}
				activeSection={activeSection}
			/>

			<StatusButton buttonStatus={buttonStatus} setButtonStatus={setButtonStatus} />

			<ul className={styled.ul}>
				{/* 判斷式:推文、回覆、喜歡的內容 */}
				{buttonStatus === '推文' && (
					<AdminTweets userTweets={userTweets} buttonStatus={buttonStatus} />
				)}

				{buttonStatus === '回覆' && (
					<AdminTweets userTweets={userReplyTweets} buttonStatus={buttonStatus} />
				)}

				{buttonStatus === '喜歡的內容' && (
					<AdminTweets userTweets={userLikeTweets} buttonStatus={buttonStatus} />
				)}
			</ul>
		</div>
	);
}

export default UserProfile;

function ReactModal({ modalIsOpen, setModalIsOpen }) {
	const { userData } = useAuthLogin();
	const [name, setName] = useState(`${userData.name}`);
	const [nameLength, setNameLength] = useState(0);
	const [intro, setIntro] = useState('');
	const [introLength, setIntroLength] = useState(0);
	const [avatar, setAvatar] = useState(null);
	const [cover, setCover] = useState(null);
	const coverInputRef = useRef(null);
	const avatarInputRef = useRef(null);
	const { setUserData } = useAuthLogin();

	const handleResetName = () => {
		setName('');
	};

	const handleNameChange = (e) => {
		e.preventDefault();
		const inputValue = e.target.value;
		const inputNoSpace = inputValue.replace(/\s+/g, '');
		const inputLength = inputNoSpace.length;
		setName(inputValue);
		setNameLength(inputLength);
	};

	const handleIntroChange = (e) => {
		e.preventDefault();
		const inputValue = e.target.value;
		const inputNoSpace = inputValue.replace(/\s+/g, '');
		const inputLength = inputNoSpace.length;
		setIntro(inputValue);
		setIntroLength(inputLength);
	};

	// 阻擋預設行為
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	// 大頭照上傳
	const handleAvatarChange = (e) => {
		e.preventDefault();
		setAvatar(e.target.files[0]);
	};

	// 背景圖上傳
	const handleCoverChange = (e) => {
		e.preventDefault();
		setCover(e.target.files[0]);
	};

	// 儲存按鈕事件
	const handleSaveClick = async (e) => {
		e.preventDefault();
		if (nameLength > 50) {
			alert('名稱字數不可超過 50 字!');
			return;
		} else if (introLength > 160) {
			alert('自我介紹數字不可超過 160 字!');
			return;
		} else if (nameLength === 0) {
			alert('請輸入名稱!');
			return;
		} else if (introLength === 0) {
			alert('請輸入自我介紹!');
			return;
		}

		const authToken = localStorage.getItem('authToken');
		const userId = localStorage.getItem('userId');

		// 修改個人資料
		const response = await getEditPersonal(userId, authToken, name, avatar, cover, intro);

		if (response) {
			// 修改成功訊息
			Swal.fire({
				position: 'top',
				title: '修改成功！',
				timer: 1000,
				icon: 'success',
				showConfirmButton: false,
			});

			setIntro('');
			setIntroLength(0);
			// 個人資料
			const data = await getUserData(userId, authToken);
			setUserData(data);

			// 編輯個人資料畫面更新
			setName(data.name);

			setModalIsOpen(false);
			return;
		}

		// 修改失敗訊息
		Swal.fire({
			position: 'top',
			title: '修改失敗！',
			timer: 1000,
			icon: 'error',
			showConfirmButton: false,
		});
	};

	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={() => setModalIsOpen(false)}
			ariaHideApp={false}
			overlayClassName={styled.overlay}
			className={styled.modal}
		>
			{/* 添加您希望顯示的內容 */}
			<div>
				{/* header */}
				<div className={styled.header}>
					<div className={styled.xButtonWrap}>
						<button className={styled.xButton}>
							<XLogo className={styled.xLogo} onClick={() => setModalIsOpen(false)} />
						</button>

						<span className={styled.headerTitle}>編輯個人資料</span>
					</div>

					<div>
						<button className={styled.saveButton} onClick={handleSaveClick}>
							儲存
						</button>
					</div>
				</div>

				{/* backImg */}
				<div className={styled.backImgWrap}>
					<img src={userData.cover || fakeBack} alt='' className={styled.backImg} />

					<div className={styled.cameraWrap}>
						<form action='' onSubmit={handleSubmit}>
							<button
								type='submit'
								className={styled.button}
								onClick={() => {
									coverInputRef.current.click();
								}}
							>
								<img src={camera} alt='' />
							</button>
							<input
								className={styled.cameraButton2}
								type='file'
								id='upload'
								ref={coverInputRef}
								hidden
								onChange={handleCoverChange}
							/>
						</form>

						<button className={styled.button}>
							<XLogo className={styled.xLogo} onClick={() => setModalIsOpen(false)} />
						</button>
					</div>
				</div>

				{/* avatar img */}
				<div className={styled.avatarWrap}>
					<img src={userData.avatar || fakePhoto} alt='' className={styled.avatarImg} />

					<div className={styled.cameraButtonWrap}>
						<form action='' onSubmit={handleSubmit}>
							<button
								type='submit'
								className={styled.cameraButton}
								onClick={() => {
									avatarInputRef.current.click();
								}}
							>
								<img src={camera} alt='' />
							</button>
							<input
								type='file'
								id='upload2'
								ref={avatarInputRef}
								hidden
								onChange={handleAvatarChange}
							/>
						</form>
					</div>
				</div>

				{/* 名稱、自我介紹 */}
				<div className={styled.inputWrap}>
					<form className={styled.form}>
						<label htmlFor=''>名稱</label>
						<input
							type='text'
							value={name}
							className={styled.input}
							onChange={handleNameChange}
							onClick={handleResetName}
						/>

						{/* 字數處理 */}
						<div className={styled.countWrap}>
							<span className={styled.countTitle}>{nameLength > 50 ? '字數超出上限' : ''}</span>
							<span className={styled.countNumber}>
								{nameLength <= 0 ? '' : `字數: ${nameLength} / 50`}
							</span>
						</div>
					</form>

					<form className={styled.form2}>
						<label htmlFor=''>自我介紹</label>
						<span className={styled.intro}>{userData.introduction}</span>
						<input
							type='text'
							value={intro}
							className={styled.input2}
							onChange={handleIntroChange}
						/>

						{/* 字數處理 */}
						<div className={styled.countWrap}>
							<span className={styled.countTitle}>{introLength > 160 ? '字數超出上限' : ''}</span>
							<span className={styled.countNumber}>
								{introLength <= 0 ? '' : `字數: ${introLength} / 160`}
							</span>
						</div>
					</form>
				</div>
			</div>
		</Modal>
	);
}
