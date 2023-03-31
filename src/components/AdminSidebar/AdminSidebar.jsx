import styled from './AdminSidebar.module.scss';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Home } from '../../assets/home.svg';
import { ReactComponent as User } from '../../assets/user-profile.svg';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as LogOut } from '../../assets/logout.svg';

function Button({ title, onClick, className }) {
	return (
		<div>
			<button onClick={onClick} className={className}>
				{title}
			</button>
		</div>
	);
}

function AdminSidebar({ setActiveComponent, activeComponent }) {
	const navigate = useNavigate();

	// 推文清單
	const handleClickTweet = (e) => {
		e.preventDefault();
		setActiveComponent('tweets');
	};

	// 使用者列表
	const handleClickUser = (e) => {
		e.preventDefault();
		setActiveComponent('users');
	};

	// 登出 event
	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem('adminAuthToken');
		navigate('/admin');
	};

	return (
		<div className={styled.buttonCon}>
			<div>
				<div>
					<Logo />
				</div>

				<div className={styled.buttonWrap}>
					<div className={styled.item}>
						<Home
							className={activeComponent === 'tweets' ? styled.activeHomeLogo : styled.homeLogo}
						/>
					</div>

					<Button
						title='推文清單'
						onClick={handleClickTweet}
						className={activeComponent === 'tweets' ? styled.activeButton : styled.button}
					/>
				</div>

				<div className={styled.buttonWrap}>
					<div className={styled.item}>
						<User className={activeComponent === 'users' ? '' : styled.userLogo} />
					</div>

					<Button
						title='使用者列表'
						onClick={handleClickUser}
						className={activeComponent === 'users' ? styled.activeButton : styled.button}
					/>
				</div>
			</div>

			<div>
				<div className={styled.buttonWrap}>
					<div className={styled.item}>
						<LogOut />
					</div>

					<Button title='登出' onClick={handleLogout} className={styled.button} />
				</div>
			</div>
		</div>
	);
}

export default AdminSidebar;
