import styles from './ReplyList.module.scss';
import { createContext, useContext } from 'react';

// 暫時用 fakeAvatar 作為頭像
import fakeAvatar from '../../assets/fake-avatar.svg';

function ReplyList() {
	const items = useContext(ReplyItemContext);

	const listItems = items.map((item) => (
		<div className={styles.itemContainer} key={item.id}>
			<a className={styles.avatar} href={item.accountName}>
				<img src={fakeAvatar} />
			</a>
			<div className={styles.infoSection}>
				<div className={styles.nameSection}>
					<a className={styles.nickname} href={item.accountName}>
						{item.nickname}
					</a>
					<div className={styles.accountAndPeriod}>
						<a href={item.accountName}>{`@${item.accountName}．`}</a>
						{`${item.period}`}
					</div>
				</div>
				<div className={styles.replyTo}>
					回覆&nbsp;<a href={item.posterAuthor}>{`@${item.posterAuthor}`}</a>
				</div>
				<div className={styles.contentSection}>
					former apple engineer shares a simple DIY fix to seal your surgical mask
				</div>
			</div>
		</div>
	));

	return <a className={styles.container}>{listItems}</a>;
}

const dummyData = [
	{
		id: '1',
		nickname: 'Devon Lane',
		accountName: 'devon_lane',
		period: '12小時',
		avatar: 'avatar',
		tweetContent: 'former apple engineer shares a simple DIY fix to seal your surgical mask',
		posterAuthor: 'apple',
	},
	{
		id: '2',
		nickname: 'Jane Cathy',
		accountName: 'iamjane1999',
		period: '3小時',
		avatar: 'avatar',
		tweetContent: 'Michelin Challenges Creatives to Upcycle',
		posterAuthor: 'apple',
	},
];

const ReplyItemContext = createContext(dummyData);

export default ReplyList;
