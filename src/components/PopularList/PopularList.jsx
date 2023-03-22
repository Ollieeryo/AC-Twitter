import styles from './PopularList.module.scss';

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

function OtherCard(img, onClick) {
	return (
		<>
			<div className={styles.otherCard}>
				<a className={styles.image} href='pizzahut'>
					<img src={img} />
				</a>
				<div className={styles.other}>
					<a className={styles.nickname} href='pizzahut'>
						Pizza Hut
					</a>
					<a className={styles.accountName} href='pizzahut'>
						@Pizzahut
					</a>
				</div>
				<button className={styles.btnFollow} onClick={onClick}>
					正在跟隨
				</button>
			</div>
		</>
	);
}

export default PopularList;
