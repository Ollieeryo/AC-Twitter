import styles from './ReplyList.module.scss';
import { Link } from 'react-router-dom';

function ReplyList({ replies }) {
	const listItems = replies.map((item) => (
		<div className={styles.itemContainer} key={item.id}>
			<Link className={styles.avatar} to={item.User.account}>
				<img src={item.User.avatar} />
			</Link>
			<div className={styles.infoSection}>
				<div className={styles.nameSection}>
					<Link className={styles.name} to={item.User.account}>
						{item.User.name}
					</Link>
					<div className={styles.accountAndPeriod}>
						<Link to={item.User.account}>{`@${item.User.account}．`}</Link>
						{`${item.period}`}
					</div>
				</div>
				<div className={styles.replyTo}>
					回覆&nbsp;<Link to={item.Tweet.User.account}>{`@${item.Tweet.User.account}`}</Link>
				</div>
				<div className={styles.contentSection}>{item.comment}</div>
			</div>
		</div>
	));

	return <div className={styles.container}>{listItems}</div>;
}

export default ReplyList;
