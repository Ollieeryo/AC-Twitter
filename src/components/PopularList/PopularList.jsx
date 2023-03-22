import styles from './PopularList.module.scss';

// 暫時用 fakeAvatar 作為頭像
import fakeAvatar from '../../assets/fake-avatar.svg';

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
				<a className={styles.avatar} href='pizzahut'>
					<img src={fakeAvatar} />
				</a>
				<div className={styles.other}>
					<a className={styles.nickname} href='pizzahut'>
						Pizza Hut
					</a>
					<a className={styles.accountName} href='pizzahut'>
						@Pizzahut
					</a>
				</div>
				<button className={styles.btnFollow}>正在跟隨</button>
			</div>
		</>
	);
}

export default PopularList;
