import styles from './MainSection.module.scss';

import Header from '../Header/Header';
// import TweetItem from '../TweetItem/TweetItem';
// import TweetInput from '../TweetInput/TweetInput';
import ReplyItem from '../ReplyItem/ReplyItem';
import ReplyPost from '../ReplyPost/ReplyPost';

function MainSection() {
	return (
		<div className={styles.container}>
			{/* <Header content='首頁' />
			<HomePage /> */}
			<Header content='推文' />
			<ReplyPage />
		</div>
	);
}

// function HomePage() {
// 	return (
// 		<>
// 			<TweetInput />
// 			<TweetItem />
// 			<TweetItem />
// 			<TweetItem />
// 			<TweetItem />
// 			<TweetItem />
// 		</>
// 	);
// }

function ReplyPage() {
	return (
		<>
			<ReplyPost />
			<ReplyItem />
			<ReplyItem />
			<ReplyItem />
			<ReplyItem />
			<ReplyItem />
		</>
	);
}

export default MainSection;
