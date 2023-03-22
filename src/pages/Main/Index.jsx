import styles from './Index.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import PopularList from '../../components/PopularList/PopularList';
import MainSection from '../../components/MainSection/MainSection';

function Main() {
	return (
		<div className={styles.container}>
			<div className={styles.sidebarSection}>
				<Sidebar />
			</div>
			<div className={styles.mainSection}>
				<MainSection />
			</div>
			<div className={styles.popularListSection}>
				<PopularList />
			</div>
		</div>
	);
}
export default Main;
