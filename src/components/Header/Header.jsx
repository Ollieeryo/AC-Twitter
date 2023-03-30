import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import leftArrow from '../../assets/left-arrow.svg';
import { useAuthLogin } from '../../contexts/AuthContext';

function Header({ activeSection, onArrowClick }) {
	let headerContent = '';
	if (activeSection === 'main') {
		headerContent = '首頁';
	} else if (activeSection === 'setting') {
		headerContent = '帳戶設定';
	} else if (activeSection === 'reply') {
		headerContent = '推文';
	}

	const { userData, userTweets } = useAuthLogin();

	return (
		<div className={styles.container}>
			{/* 箭頭 */}
			{activeSection === 'userProfile' ||
			activeSection === 'follower' ||
			activeSection === 'following' ||
			activeSection === 'reply' ? (
				<div className={styles.arrow} onClick={onArrowClick}>
					<img src={leftArrow} alt='' />
				</div>
			) : (
				''
			)}

			{/* header 文字變動 */}
			{activeSection === 'main' && (
				<Link className={styles.content} to=''>
					{headerContent}
				</Link>
			)}

			{activeSection === 'reply' && (
				<Link className={styles.content} to=''>
					{headerContent}
				</Link>
			)}

			{activeSection === 'userProfile' ||
			activeSection === 'follower' ||
			activeSection === 'following' ? (
				<Link className={styles.content} to=''>
					<div className={styles.userTitleWrap}>
						<span>{userData.name}</span>
						<span className={styles.tweetText}>{userTweets.length} 推文</span>
					</div>
				</Link>
			) : (
				''
			)}

			{activeSection === 'setting' && (
				<Link className={styles.content} to=''>
					{headerContent}
				</Link>
			)}
		</div>
	);
}

export default Header;
