import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
// import leftArrow from '../../assets/left-arrow.svg';

function Header({ leftArrow, content }) {
	return (
		<div className={styles.container}>
			<Link className={styles.arrow} to='home'>
				{leftArrow}
			</Link>
			<Link className={styles.content} to=''>
				{content}
			</Link>
		</div>
	);
}

export default Header;
