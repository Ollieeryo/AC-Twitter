import styles from './PopularList.module.scss';

// 暫時用 fakeAvatar 作為頭像
import fakeAvatar from '../../assets/fake-avatar.svg';
import { Link } from 'react-router-dom';

function PopularList() {
	return (
		<div className={styles.container}>
			<div className={styles.topic}>
				<p>推薦跟隨</p>
			</div>
			<div className={styles.others}>
				<OtherCard />
				<OtherCard />
				<OtherCard />
				<OtherCard />
				<OtherCard />
			</div>
		</div>
	);
}

function OtherCard() {
	return (
		<>
			<div className={styles.otherCard}>
				<Link className={styles.avatar} to='pizzahut'>
					<img src={fakeAvatar} />
				</Link>
				<div className={styles.other}>
					<Link className={styles.nickname} to='pizzahut'>
						Pizza Hut
					</Link>
					<Link className={styles.accountName} to='pizzahut'>
						@Pizzahut
					</Link>
				</div>
				<button className={styles.btnFollow}>正在跟隨</button>
			</div>
		</>
	);
}

export default PopularList;
