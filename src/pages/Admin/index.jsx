import { Link } from 'react-router-dom';
import AdminInput from '../../components/AdminInput/AdminInput';
import LogoTitle from '../../components/LogoTitle/LogoTitle';
import styled from './Index.module.scss';

function Admin() {
	return (
		<div className={styled.loginCon}>
			<div className={styled.loginWrap}>
				<LogoTitle title='後台登入' />
				<AdminInput />

				<div className={styled.pageButton}>
					<Link to='/login'>
						<button className={styled.button}>前台登入</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Admin;
