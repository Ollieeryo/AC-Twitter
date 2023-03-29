import styles from './Sidebar.module.scss';

import alphacampLogo from '../../assets/alphacamp-logo.svg';
import home from '../../assets/home.svg';
import userProfile from '../../assets/user-profile.svg';
import setting from '../../assets/setting.svg';
import logout from '../../assets/logout.svg';
import { Link } from 'react-router-dom';

function Sidebar() {
	return (
		<div className={styles.container}>
			<div className={styles.navigationBar}>
				<Link className={styles.logo} to='home'>
					<img src={alphacampLogo} />
				</Link>
				<Link className={styles.home} to='home'>
					<img src={home} />
					首頁
				</Link>
				<Link className={styles.userProfile}>
					<img src={userProfile} />
					個人資料
				</Link>
				<Link className={styles.setting}>
					<img src={setting} />
					設定
				</Link>
				<Link className={styles.toTweet} to='tweet'>
					推文
				</Link>
			</div>
			<Link className={styles.logout} to='login'>
				<img src={logout} />
				登出
			</Link>
		</div>
	);
}

export default Sidebar;
