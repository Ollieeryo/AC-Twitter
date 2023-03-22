import styles from './Header.module.scss';
// import leftArrow from '../../assets/left-arrow.svg';

function Header({ content }) {
	return (
		<div className={styles.container}>
			{/* <a className={styles.leftArrow} href='#'>
				<img src={leftArrow} />
			</a> */}
			<a className={styles.content} href='*'>
				{content}
			</a>
		</div>
	);
}

export default Header;
