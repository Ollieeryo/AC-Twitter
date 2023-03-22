import { Link } from 'react-router-dom';
import LoginInput from '../../components/LoginInput/LoginInput';
import LogoTitle from '../../components/LogoTitle/LogoTitle';
import styled from './Index.module.scss';

function Login() {
	return (
		<div className={styled.loginCon}>
			<div className={styled.loginWrap}>
				<LogoTitle title='登入 Alphitter' />
				<LoginInput />

				<div className={styled.pageButton}>
					<Link to='/register'>
						<button className={styled.button}>註冊</button>
					</Link>

					<span>・</span>
					<Link to='/admin'>
						<button className={styled.button}>後台登入</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
