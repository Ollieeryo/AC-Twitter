import styled from './AdminUserList.module.scss';
import fakeBack from '../../assets/fake-back.svg';
import fakePhoto from '../../assets/fake-photo.svg';
import feather from '../../assets/feather.svg';
import heart from '../../assets/heart.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllUsers } from '../../api/admin';
import { useNavigate } from 'react-router-dom';

function UserCard({ allUserData }) {
	return allUserData.map((user) => {
		return (
			<li key={user.id} id={user.id}>
				<div className={styled.card}>
					<div>
						<img src={user.cover || fakeBack} alt='' className={styled.cover} />
					</div>

					<div className={styled.avatar}>
						<img src={user.avatar || fakePhoto} alt='' className={styled.avatarImg} />
					</div>

					<div className={styled.info}>
						<span className={styled.infoTitle}>{user.name}</span>
						<span className={styled.infoAccount}>@{user.account}</span>
					</div>

					<div className={styled.likeCon}>
						<div className={styled.likeWrap}>
							<img src={feather} alt='' />
							<span>{user.tweetCounts}</span>
						</div>

						<div className={styled.likeWrap}>
							<img src={heart} alt='' />
							<span>{user.beLikedCounts}</span>
						</div>
					</div>

					<div className={styled.followCon}>
						<div>
							<span>{user.followingCounts} 個</span>
							<span className={styled.followText}>跟隨中</span>
						</div>

						<div>
							<span>{user.followerCounts} 位</span>
							<span className={styled.followText}>跟隨者</span>
						</div>
					</div>
				</div>
			</li>
		);
	});
}

function AdminUserList() {
	const [allUsers, setAllUsers] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const authToken = localStorage.getItem('adminAuthToken');

				if (!authToken) {
					navigate('/admin');
					return;
				}

				const result = await getAllUsers(authToken);
				setAllUsers(result);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUserData();
	}, []);

	return (
		<div className={styled.listCon}>
			<div className={styled.cardWrap}>
				<ul className={styled.ul}>
					<UserCard allUserData={allUsers} />
				</ul>
			</div>
		</div>
	);
}

export default AdminUserList;
