import styles from './Index.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';

function Main() {
	return (
		<div className={styles.container}>
			<div className={styles.sidebarSection}>
				<Sidebar />
			</div>
			<div className={styles.mainSection}>Main</div>
			<div className={styles.popularListSection}>PopularList</div>
		</div>
	);
}
export default Main;
