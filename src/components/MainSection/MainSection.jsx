import styles from './MainSection.module.scss';
import Header from '../Header/Header';
import TweetItem from '../TweetItem/TweetItem';
import TweetInput from '../TweetInput/TweetInput';
import UserProfile from '../UserProfile/UserProfile';
import SettingInput from '../SettingInput/SettingInput';
import FollowList from '../FollowList/FollowList';

function MainSection({ activeSection, setActiveSection }) {
	return (
		<div className={styles.container}>
			<Header activeSection={activeSection} />

			{/* Main */}
			{activeSection === 'main' && (
				<>
					<TweetInput />
					<TweetItem />
					<TweetItem />
					<TweetItem />
					<TweetItem />
					<TweetItem />
				</>
			)}

			{/* UserProfile */}
			{activeSection === 'userProfile' && (
				<UserProfile activeSection={activeSection} setActiveSection={setActiveSection} />
			)}

			{/* Setting */}
			{activeSection === 'setting' && <SettingInput />}

			{/* followList */}
			{(activeSection === 'follower' || activeSection === 'following') && (
				<FollowList activeSection={activeSection} setActiveSection={setActiveSection} />
			)}
		</div>
	);
}

export default MainSection;
