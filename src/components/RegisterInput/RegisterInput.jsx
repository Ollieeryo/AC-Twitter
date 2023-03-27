import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { checkPermission, register } from '../../api/auth';
import { useAuthSignUp } from '../../contexts/AuthSignUpContext';
import Input from '../Input/Input';
import MainButton from '../MainButton/MainButton';
import styled from './RegisterInput.module.scss';

function RegisterInput() {
	// useContext
	const {
		accountLength,
		account,
		name,
		email,
		password,
		checkPassword,
		handleAccountChange,
		handleUserNameChange,
		handleEmailChange,
		handlePasswordChange,
		handleCheckPasswordChange,
	} = useAuthSignUp();

	const navigate = useNavigate();

	// 註冊 event
	const handleSignUpSubmit = async (e) => {
		e.preventDefault();
		if (account.length === 0) {
			alert('帳號欄位不能為空');
		} else if (accountLength > 50) {
			alert('帳號字數超過上限!');
		} else if (name.length === 0) {
			alert('名稱欄位不能為空');
		} else if (email.length === 0) {
			alert('Email 欄位不能為空');
		} else if (password.length === 0) {
			alert('密碼欄位不能為空');
		} else if (checkPassword.length === 0) {
			alert('密碼確認欄位不能為空');
		} else if (password !== checkPassword) {
			alert('密碼與密碼確認輸入值不同');
		}

		const { success, authToken } = await register({
			account,
			name,
			email,
			password,
			checkPassword,
		});

		if (success) {
			localStorage.setItem('authToken', authToken);
			Swal.fire({
				position: 'top',
				title: '註冊成功！',
				timer: 1000,
				icon: 'success',
				showConfirmButton: false,
			});
			return;
		}

		// 註冊失敗
		Swal.fire({
			position: 'top',
			title: '註冊失敗！',
			timer: 1000,
			icon: 'error',
			showConfirmButton: false,
		});
	};

	// check permission
	useEffect(() => {
		const checkTokenIsValid = async () => {
			const authToken = localStorage.getItem('authToken');
			if (!authToken) {
				return;
			}
			const result = await checkPermission(authToken);
			if (result) {
				navigate('/main');
			}
		};

		checkTokenIsValid();
	}, [navigate]);

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
					{/* 增加帳號已有被人註冊的判斷式 */}
					<span className={styled.countTitle}>{accountLength > 50 ? '字數超出上限' : ''}</span>
					<span className={styled.countNumber}>
						{accountLength <= 0 ? '' : `字數: ${accountLength} / 50`}
					</span>
				</div>
			</div>

			<div className={styled.inputWrap}>
				{/* 增加帳號已有被人註冊的判斷式 */}
				<Input
					inputTitle='名稱'
					type='username'
					value={name}
					placeholder='請輸入使用者名稱'
					onChange={handleUserNameChange}
				/>
			</div>

			{/* 數字改字體 */}
			<div className={styled.inputWrap}>
				{/* 增加email已有被人註冊的判斷式 */}
				<Input
					inputTitle='Email'
					type='email'
					value={email}
					placeholder='請輸入 Email'
					onChange={handleEmailChange}
				/>
			</div>

			<div className={styled.inputWrap}>
				{/* 增加email已有被人註冊的判斷式 */}
				<Input
					inputTitle='密碼'
					type='password'
					value={password}
					placeholder='請設定密碼'
					onChange={handlePasswordChange}
				/>
			</div>

			<div className={styled.inputWrap}>
				<Input
					inputTitle='密碼確認'
					type='password'
					value={checkPassword}
					placeholder='請再次輸入密碼'
					onChange={handleCheckPasswordChange}
				/>
			</div>

			<MainButton buttonTitle='註冊' onClick={handleSignUpSubmit} />
		</div>
	);
}

export default RegisterInput;
