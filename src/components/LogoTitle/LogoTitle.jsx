import styled from './LogoTitle.module.scss';
import logo from '../../assets/logo.svg';

function LogoTitle({ title }) {
	return (
		<>
			<div className={styled.logoWrap}>
				<img className={styled.logo} src={logo} alt='' />
			</div>

			<h3 className={styled.title}>{title}</h3>
		</>
	);
}

export default LogoTitle;
