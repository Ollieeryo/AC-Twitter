import styles from './MainSection.module.scss';

import Header from '../Header/Header';
import TweetInput from '../TweetInput/TweetInput';
import TweetList from '../TweetList/TweetList';
// import ReplyPost from '../ReplyPost/ReplyPost';
// import ReplyList from '../ReplyList/ReplyList';

function MainSection() {
	return (
		<div className={styles.container}>
			<Header content='首頁' />
			<HomePage />
			{/* <Header content='推文' />
			<ReplyPage /> */}
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
