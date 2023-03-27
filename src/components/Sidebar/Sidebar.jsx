import styles from './Sidebar.module.scss';

import alphacampLogo from '../../assets/alphacamp-logo.svg';
import home from '../../assets/home.svg';
import userProfile from '../../assets/user-profile.svg';
import setting from '../../assets/setting.svg';
import logout from '../../assets/logout.svg';

function Sidebar() {
	return (
		<div className={styles.container}>
			<div className={styles.navigationBar}>
				<a className={styles.logo} href='home'>
					<img src={alphacampLogo} />
				</a>
				<a className={styles.home} href='home'>
					<img src={home} />
					首頁
				</a>
				<a className={styles.userProfile}>
					<img src={userProfile} />
					個人資料
				</a>
				<a className={styles.setting}>
					<img src={setting} />
					設定
				</a>
				<a className={styles.toTweet}>推文</a>
			</div>
			<a className={styles.logout}>
				<img src={logout} />
				登出
			</a>
		</div>
	);
}

export default Sidebar;
