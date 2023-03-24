import styled from './AdminHeader.module.scss';

function AdminHeader({ activeComponent }) {
	return (
		<div className={styled.headerWrap}>
			<header>
				<span>{activeComponent === 'tweets' ? '推文清單' : '使用者列表'}</span>
			</header>
		</div>
	);
}

export default AdminHeader;
