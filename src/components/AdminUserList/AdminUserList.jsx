import styled from './AdminUserList.module.scss';
import fakeBack from '../../assets/fake-back.svg';
import fakePhoto from '../../assets/fake-photo.svg';
import feather from '../../assets/feather.svg';
import heart from '../../assets/heart.svg';

function UserCard() {
	return (
		<li>
			<div className={styled.card}>
				<div>
					<img src={fakeBack} alt='' />
				</div>

				<div className={styled.avatar}>
					<img src={fakePhoto} alt='' />
				</div>

				<div className={styled.info}>
					<span className={styled.infoTitle}>John Doe</span>
					<span className={styled.infoAccount}>@heyjohn</span>
				</div>

				<div className={styled.likeCon}>
					<div className={styled.likeWrap}>
						<img src={feather} alt='' />
						<span>1.5k</span>
					</div>

					<div className={styled.likeWrap}>
						<img src={heart} alt='' />
						<span>20k</span>
					</div>
				</div>

				<div className={styled.followCon}>
					<div>
						<span>34 個</span>
						<span className={styled.followText}>跟隨中</span>
					</div>

					<div>
						<span>59 位</span>
						<span className={styled.followText}>跟隨者</span>
					</div>
				</div>
			</div>
		</li>
	);
}

function AdminUserList() {
	return (
		<div className={styled.listCon}>
			<div className={styled.cardWrap}>
				<ul className={styled.ul}>
					<UserCard />
					<UserCard />
					<UserCard />
					<UserCard />
					<UserCard />
					<UserCard />
					<UserCard />
					<UserCard />
				</ul>
			</div>
		</div>
	);
}

export default AdminUserList;
