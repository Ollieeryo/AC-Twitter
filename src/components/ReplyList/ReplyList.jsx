import styles from './ReplyList.module.scss';
import { Link } from 'react-router-dom';

function ReplyList({ replies }) {
	const account = replies?.User?.account;

	const listItems = replies.map((item) => (
		<div className={styles.itemContainer} key={item.id}>
			<Link className={styles.avatar} to={`/${account}`}>
				<img src={item.User.avatar} />
			</Link>
			<div className={styles.infoSection}>
				<div className={styles.nameSection}>
					<Link className={styles.name} to={`/${account}`}>
						{item.User.name}
					</Link>
					<div className={styles.accountAndPeriod}>
						<Link to={`/${account}`}>{`@${item.User.account}．`}</Link>
						{`${item.period}`}
					</div>
				</div>
				<div className={styles.replyTo}>
					回覆&nbsp;<Link to={`/${account}`}>{`@${item.User.account}`}</Link>
				</div>
				<div className={styles.contentSection}>{item.comment}</div>
			</div>
		</div>
	));

	return <div className={styles.container}>{listItems}</div>;
}

export default ReplyList;
