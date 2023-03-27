import styles from './TweetList.module.scss';
import { createContext, useContext } from 'react';

import reply from '../../assets/reply.svg';
import like from '../../assets/like.svg';
// 暫時用 fakeAvatar 作為頭像
import fakeAvatar from '../../assets/fake-avatar.svg';

function TweetList() {
	const items = useContext(TweetItemContext);
	const repliesCount = 13;

	const listItems = items.map((item) => (
		<div className={styles.itemContainer} key={item.id}>
			<a className={styles.avatar} href='apple'>
				<img src={fakeAvatar} />
			</a>
			<div className={styles.infoSection}>
				<div className={styles.nameSection}>
					<div className={styles.nickname}>{item.nickname}</div>
					<div className={styles.accountAndPeriod}>
						<a href={item.accountName}>{`@${item.accountName}．`}</a>
						{`${item.period}`}
					</div>
				</div>
				<div className={styles.contentSection}>{item.tweetContent}</div>
				<div className={styles.ReplyAndLike}>
					<a className={styles.counter} href='replyModal'>
						<img src={reply} />
						{repliesCount}
					</a>
					<a className={styles.counter} href='toLike'>
						<img src={like} />
						{item.likes}
					</a>
				</div>
			</div>
		</div>
	));

	return (
		<a className={styles.hrefContainer} href='thisTweet'>
			{listItems}
		</a>
	);
}

const dummyData = [
	{
		id: '1',
		nickname: 'Apple',
		accountName: 'apple',
		period: '3小時',
		avatar: 'avatar',
		tweetContent:
			'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.	Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.',
		replies: {
			reply1: 'say something',
			reply2: 'good tweet',
		},
		likes: 76,
	},
	{
		id: '2',
		nickname: 'Jane Cathy',
		accountName: 'iamjane1999',
		period: '3小時',
		avatar: 'avatar',
		tweetContent:
			'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.	Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.',
		replies: {
			reply1: 'say something',
			reply2: 'good tweet',
		},
		likes: 88,
	},
];

const TweetItemContext = createContext(dummyData);

export default TweetList;
