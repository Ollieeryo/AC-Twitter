import styles from './ReplyItem.module.scss';

// 暫時用 fakeAvatar 作為頭像
import fakeAvatar from '../../assets/fake-avatar.svg';
import { Link } from 'react-router-dom';

function ReplyItem() {
	return (
		<div className={styles.container}>
			<Link className={styles.avatar} to='apple'>
				<img src={fakeAvatar} />
			</Link>
			<div className={styles.infoSection}>
				<div className={styles.nameSection}>
					<div className={styles.nickname}>Devon Lane</div>
					<div className={styles.accountAndPeriod}>@devon_lane・12 小時</div>
				</div>
				<div className={styles.replyTo}>
					回覆&nbsp;<span>@apple</span>
				</div>
				<div className={styles.contentSection}>
					former apple engineer shares a simple DIY fix to seal your surgical mask
				</div>
			</div>
		</div>
	);
}

export default ReplyItem;
