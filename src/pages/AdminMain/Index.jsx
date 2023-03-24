import { useState } from 'react';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminTweetList from '../../components/AdminTweetList/AdminTweetList';
import AdminUserList from '../../components/AdminUserList/AdminUserList';
import styled from './Index.module.scss';

function AdminMain() {
	const [activeComponent, setActiveComponent] = useState('tweets');

	return (
		<div className={styled.container}>
			{/* 80%寬度 */}
			<div className={styled.section}>
				<div className={styled.sideBar}>
					<AdminSidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
				</div>

				{/* tweet section */}
				<div className={styled.listContainer}>
					<AdminHeader activeComponent={activeComponent} />
					{activeComponent === 'tweets' && <AdminTweetList />}
					{activeComponent === 'users' && <AdminUserList />}
				</div>
			</div>
		</div>
	);
}

export default AdminMain;
