import styles from './Index.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import PopularList from '../../components/PopularList/PopularList';
import MainSection from '../../components/MainSection/MainSection';
import { useState } from 'react';

function Main() {
	const [activeSection, setActiveSection] = useState('main');

	return (
		<div className={styles.container}>
			<div className={styles.sidebarSection}>
				<Sidebar setActiveSection={setActiveSection} />
			</div>
			<div className={styles.mainSection}>
				<MainSection activeSection={activeSection} setActiveSection={setActiveSection} />
			</div>
			<div className={styles.popularListSection}>
				<PopularList />
			</div>
		</div>
	);
}
export default Main;
