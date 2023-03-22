import styles from './MainSection.module.scss';
import Header from '../Header/Header';
import TweetItem from '../TweetItem/TweetItem';
import TweetInput from '../TweetInput/TweetInput';

function MainSection() {
	return (
		<div className={styles.container}>
			<Header content='首頁' />

			<TweetInput />

			<TweetItem />
			<TweetItem />
			<TweetItem />
			<TweetItem />
			<TweetItem />
		</div>
	);
}

export default MainSection;
