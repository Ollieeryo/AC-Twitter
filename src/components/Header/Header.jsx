import styles from './Header.module.scss';
// import leftArrow from '../../assets/left-arrow.svg';

function Header({ leftArrow, content }) {
	return (
		<div className={styles.container}>
			<a className={styles.arrow} href='home'>
				{leftArrow}
			</a>
			<a className={styles.content} href=''>
				{content}
			</a>
		</div>
	);
}

export default Header;
