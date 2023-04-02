import styles from './Sidebar.module.scss';
import alphacampLogo from '../../assets/alphacamp-logo.svg';
import home from '../../assets/home.svg';
import homeGrey from '../../assets/home-grey.svg';
import userProfile from '../../assets/user-profile.svg';
import userProfileBlack from '../../assets/user-profile-black.svg';
import settingOrange from '../../assets/setting-orange.svg';
import setting from '../../assets/setting-black.svg';
import logout from '../../assets/logout.svg';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar({ activeSection, setActiveSection, onToTweetClick }) {
	const navigate = useNavigate();

	const handleChangeMain = (e) => {
		e.preventDefault();
		setActiveSection('main');
	};

	const handleChangeUserProfile = (e) => {
		e.preventDefault();
		setActiveSection('userProfile');
	};

	const handleChangeSetting = (e) => {
		e.preventDefault();
		setActiveSection('setting');
	};

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem('authToken');
		localStorage.removeItem('userId');
		// 進行其他登出相關操作
		navigate('/login');
	};

	return (
		<div className={styles.container}>
			<div className={styles.navigationBar}>
				<Link className={styles.logo} to='main' onClick={handleChangeMain}>
					<img src={alphacampLogo} />
				</Link>
				<div
					className={activeSection === 'main' ? styles.acitve : styles.notAcitve}
					onClick={handleChangeMain}
				>
					{activeSection === 'main' ? <img src={home} /> : <img src={homeGrey} />}
					首頁
				</div>
				<Link
					className={activeSection === 'userProfile' ? styles.acitve : styles.notAcitve}
					to='userProfile'
					onClick={handleChangeUserProfile}
				>
					{activeSection === 'userProfile' ? (
						<img src={userProfile} />
					) : (
						<img src={userProfileBlack} />
					)}
					個人資料
				</Link>
				<Link
					className={activeSection === 'setting' ? styles.acitve : styles.notAcitve}
					to='setting'
					onClick={handleChangeSetting}
				>
					{activeSection === 'setting' ? <img src={settingOrange} /> : <img src={setting} />}
					設定
				</Link>
				<div className={styles.toTweet} onClick={onToTweetClick}>
					推文
				</div>
			</div>
			<Link className={styles.logout} to='login' onClick={handleLogout}>
				<img src={logout} />
				登出
			</Link>
		</div>
	);
}

export default Sidebar;
