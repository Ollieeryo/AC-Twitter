import { Link } from 'react-router-dom';
import LogoTitle from '../../components/LogoTitle/LogoTitle';
import RegisterInput from '../../components/RegisterInput/RegisterInput';
import styled from './Index.module.scss';

function Register() {
	return (
		<div className={styled.loginCon}>
			<div className={styled.loginWrap}>
				<LogoTitle title='建立你的帳號' />
				<RegisterInput />

				<div className={styled.pageButton}>
					<Link to='/login'>
						<button className={styled.button}>取消</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Register;
