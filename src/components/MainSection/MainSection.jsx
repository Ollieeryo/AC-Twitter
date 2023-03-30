import styles from './MainSection.module.scss';

import Header from '../Header/Header';
import TweetInput from '../TweetInput/TweetInput';
import UserProfile from '../UserProfile/UserProfile';
import SettingInput from '../SettingInput/SettingInput';
import FollowList from '../FollowList/FollowList';
import TweetList from '../TweetList/TweetList';
// import ReplyPost from '../ReplyPost/ReplyPost';
// import ReplyList from '../ReplyList/ReplyList';

function MainSection({ activeSection, setActiveSection }) {
	return (
		<div className={styles.container}>
			<Header activeSection={activeSection} />

			{/* Main */}
			{activeSection === 'main' && (
				<>
					<HomePage />
				{/* <Header content='推文' />
					<ReplyPage /> */}
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

function HomePage() {
	return (
		<>
			<TweetInput />
			<TweetList />
		</>
	);
}

// function ReplyPage() {
// 	return (
// 		<>
// 			<ReplyPost />
// 			<ReplyList />
// 		</>
// 	);
// }

export default MainSection;
