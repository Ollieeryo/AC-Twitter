// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { login } from '../../api/auth';
import { useAuthLogin } from '../../contexts/AuthContext';
import Input from '../Input/Input';
import MainButton from '../MainButton/MainButton';
import styled from './LoginInput.module.scss';

function LoginInput() {
	// useContext
	const {
		account,
		setAccount,
		accountLength,
		setAccountLength,
		password,
		setPassword,
		handleAccountChange,
		handlePasswordChange,
	} = useAuthLogin();

	const navigate = useNavigate();

	// 登入 event
	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		if (account === '') {
			alert('請輸入帳號!');
			return;
		}
		if (accountLength > 50) {
			alert('帳號字數不可超過 50 字!');
			return;
		}
		if (password === '') {
			alert('請輸入密碼!');
			return;
		}

		const { success, authToken, user, wrongAdminAccount, wrongAccountPassword } = await login({
			account,
			password,
		});

		if (wrongAdminAccount === 'Error: Account or password is wrong!') {
			Swal.fire({
				position: 'top',
				title: '帳號或密碼錯誤!',
				timer: 1000,
				icon: 'error',
				showConfirmButton: false,
			});
			return;
		}

		if (wrongAccountPassword === 'Unauthorized') {
			Swal.fire({
				position: 'top',
				title: '帳號或密碼錯誤!',
				timer: 1000,
				icon: 'error',
				showConfirmButton: false,
			});
			return;
		}

		if (success) {
			localStorage.setItem('authToken', authToken);
			localStorage.setItem('userId', user.id);
			setAccount('');
			setPassword('');
			setAccountLength(0);

			// 登入成功訊息
			Swal.fire({
				position: 'top',
				title: '登入成功！',
				timer: 1000,
				icon: 'success',
				showConfirmButton: false,
			});

			navigate('/main');
			return;
		}

		// 登入失敗訊息
		Swal.fire({
			position: 'top',
			title: '登入失敗！',
			timer: 1000,
			icon: 'error',
			showConfirmButton: false,
		});
	};

	return (
		<div className={styled.inputCon}>
			<div className={styled.inputWrap}>
				<Input
					inputTitle='帳號'
					type='account'
					value={account}
					placeholder='請輸入帳號'
					onChange={handleAccountChange}
				/>

				<div className={styled.countWrap}>
					<span className={styled.countTitle}>{accountLength > 50 ? '字數超出上限' : ''}</span>
					<span className={styled.countNumber}>
						{accountLength <= 0 ? '' : `字數: ${accountLength} / 50`}
					</span>
				</div>
			</div>

			<div className={styled.inputWrap}>
				<Input
					inputTitle='密碼'
					type='password'
					value={password}
					placeholder='請輸入密碼'
					onChange={handlePasswordChange}
				/>
			</div>

			<MainButton buttonTitle='登入' onClick={handleLoginSubmit} />
		</div>
	);
}

export default LoginInput;
