import styles from './Header.module.scss';
import leftArrow from '../../assets/left-arrow.svg';
import { useAuthLogin } from '../../contexts/AuthContext';

function Header({ activeSection }) {
	let headerContent = '';
	if (activeSection === 'main') {
		headerContent = '首頁';
	} else if (activeSection === 'setting') {
		headerContent = '帳戶設定';
	}

	const { userData, userTweets } = useAuthLogin();

	return (
		<div className={styles.container}>
			{/* 箭頭 */}
			{activeSection === 'userProfile' ||
			activeSection === 'follower' ||
			activeSection === 'following' ? (
				<a className={styles.arrow} href='home'>
					<img src={leftArrow} alt='' />
				</a>
			) : (
				''
			)}

			{/* header 文字變動 */}
			{activeSection === 'main' && (
				<a className={styles.content} href=''>
					{headerContent}
				</a>
			)}

			{activeSection === 'userProfile' ||
			activeSection === 'follower' ||
			activeSection === 'following' ? (
				<a className={styles.content} href=''>
					<div className={styles.userTitleWrap}>
						<span>{userData.name}</span>
						<span className={styles.tweetText}>{userTweets.length} 推文</span>
					</div>
				</a>
			) : (
				''
			)}

			{activeSection === 'setting' && (
				<a className={styles.content} href=''>
					{headerContent}
				</a>
			)}
		</div>
	);
}

export default Header;
