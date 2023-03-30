import styles from './Sidebar.module.scss';
import alphacampLogo from '../../assets/alphacamp-logo.svg';
import home from '../../assets/home.svg';
import userProfile from '../../assets/user-profile.svg';
import setting from '../../assets/setting.svg';
import logout from '../../assets/logout.svg';
import { useNavigate } from 'react-router-dom';

function Sidebar({ setActiveSection }) {
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
				<a className={styles.logo} href='main'>
					<img src={alphacampLogo} />
				</a>
				
				<a className={styles.home} href='main' onClick={handleChangeMain}>
					<img src={home} />
					首頁
				</a>
				<a className={styles.userProfile} href='userProfile' onClick={handleChangeUserProfile}>
					<img src={userProfile} />
					個人資料
				</a>
				<a className={styles.setting} href='setting' onClick={handleChangeSetting}>
					<img src={setting} />
					設定
				</a>
				<Link className={styles.toTweet} to='tweet'>
					推文
				</Link>
			</div>
			<a className={styles.logout} href='login' onClick={handleLogout}>
				<img src={logout} />
				登出
			</Link>
		</div>
	);
}

export default Sidebar;
