import styles from './Sidebar.module.scss';
import alphacampLogo from '../../assets/alphacamp-logo.svg';
import home from '../../assets/home.svg';
import userProfile from '../../assets/user-profile-black.svg';
import setting from '../../assets/setting.svg';
import logout from '../../assets/logout.svg';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar({ setActiveSection, onToTweetClick }) {
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
				<Link className={styles.home} to='main'>
					<img src={home} />
					首頁
				</Link>
				<Link className={styles.userProfile} to='userProfile' onClick={handleChangeUserProfile}>
					<img src={userProfile} />
					個人資料
				</Link>
				<Link className={styles.setting} to='setting' onClick={handleChangeSetting}>
					<img src={setting} />
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
