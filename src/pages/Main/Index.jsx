import styles from './Index.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import PopularList from '../../components/PopularList/PopularList';
import MainSection from '../../components/MainSection/MainSection';
import { useState } from 'react';
import TweetModal from '../../components/TweetModal/TweetModal';
import { getUserData } from '../../api/userprofile';
import { useNavigate } from 'react-router-dom';

function Main() {
	const [activeSection, setActiveSection] = useState('main');
	const [showModal, setShowModal] = useState(false);
	const [userData, setUserData] = useState();
	const navigate = useNavigate();

	const getUserAsync = async () => {
		try {
			const authToken = localStorage.getItem('authToken');
			const user = await getUserData(userData, authToken);
			if (!authToken) {
				navigate('/login');
				return;
			}
			setUserData(user);
		} catch (error) {
			console.error(error);
		}
	};
	getUserAsync();

	function handleToTweetClick() {
		setShowModal(true);
	}

	function handleModalClose() {
		setShowModal(false);
	}

	return (
		<div className={`${styles.container} ${showModal ? styles.showModal : styles.hideModal}`}>
			<div className={styles.sidebarSection}>
				<Sidebar setActiveSection={setActiveSection} onToTweetClick={handleToTweetClick} />
			</div>
			<div className={styles.mainSection}>
				<MainSection
					activeSection={activeSection}
					setActiveSection={setActiveSection}
					ToTweetModalHandler={handleToTweetClick}
				/>
			</div>
			<div className={styles.popularListSection}>
				<PopularList />
			</div>
			<div className={`${styles.tweetModal} ${showModal ? styles.showModal : styles.hideModal}`}>
				<TweetModal self={userData} onCloseModal={handleModalClose} />
			</div>
		</div>
	);
}
export default Main;
