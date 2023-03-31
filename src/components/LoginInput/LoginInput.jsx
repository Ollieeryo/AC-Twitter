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
			alert('帳號欄位不能為空');
			return;
		}
		if (accountLength > 50) {
			alert('帳號字數超過上限!');
			return;
		}
		if (password === '') {
			alert('密碼欄位不能為空');
			return;
		}

		const { success, authToken, user } = await login({
			account,
			password,
		});

		if (success) {
			localStorage.setItem('authToken', authToken);
			localStorage.setItem('userId', user.id);
			setAccount('');
			setPassword('');

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

	// check permission
	// useEffect(() => {
	// 	const checkTokenIsValid = async () => {
	// 		const authToken = localStorage.getItem('authToken');
	// 		if (!authToken) {
	// 			return;
	// 		}
	// 		const result = await checkPermission(authToken);
	// 		if (result) {
	// 			navigate('/main');
	// 		}
	// 	};

	// 	checkTokenIsValid();
	// }, [navigate]);

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
