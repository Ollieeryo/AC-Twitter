import styles from './OtherReplyList.module.scss';

function ReplyList({ replies }) {
	const listItems = replies.map((item) => (
		<div className={styles.itemContainer} key={item.id}>
			<div className={styles.avatar}>
				<img src={item.User.avatar} />
			</div>
			<div className={styles.infoSection}>
				<div className={styles.nameSection}>
					<div className={styles.name}>{item.User.name}</div>
					<div className={styles.accountAndPeriod}>
						<div>{`@${item.User.account}．`}</div>
						{`${item.period}`}
					</div>
				</div>
				<div className={styles.replyTo}>
					回覆&nbsp;<div>{`@${item.Tweet.User.account}`}</div>
				</div>
				<div className={styles.contentSection}>{item.comment}</div>
			</div>
		</div>
	));

	return <div className={styles.container}>{listItems}</div>;
}

export default ReplyList;
