import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { adminLogin } from '../../api/auth';
import Input from '../Input/Input';
import MainButton from '../MainButton/MainButton';
import styled from './AdminInput.module.scss';

function AdminInput() {
	const [account, setAccount] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleAccountChange = (e) => {
		const inputValue = e.target.value;
		// 使用正規表達式去除空格
		const inputWithoutSpaces = inputValue.trim();
		setAccount(inputWithoutSpaces);
	};

	const handlePasswordChange = (e) => {
		const inputValue = e.target.value;
		// 使用 trim 刪除 string 前後空白
		const inputWithoutSpaces = inputValue.trim();
		setPassword(inputWithoutSpaces);
	};

	// 登入 event
	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		if (account.length === 0) {
			alert('請輸入帳號!');
			return;
		}
		if (password.length === 0) {
			alert('請輸入密碼!');
			return;
		}

		const { success, authToken, wrongAccountPassword, wrongAccountPassword2 } = await adminLogin({
			account,
			password,
		});

		if (success) {
			localStorage.setItem('adminAuthToken', authToken);

			// 登入成功訊息
			Swal.fire({
				position: 'top',
				title: '登入成功！',
				timer: 1000,
				icon: 'success',
				showConfirmButton: false,
			});
			navigate('/admin/main');
			return;
		}

		if (wrongAccountPassword === 'Unauthorized') {
			alert('帳號或密碼錯誤!');
			Swal.fire({
				position: 'top',
				title: '帳號或密碼錯誤!',
				timer: 1000,
				icon: 'error',
				showConfirmButton: false,
			});

			return;
		}

		if (wrongAccountPassword2 === 'Error: Account or password is wrong!') {
			Swal.fire({
				position: 'top',
				title: '帳號或密碼錯誤!',
				timer: 1000,
				icon: 'error',
				showConfirmButton: false,
			});
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
			</div>

			{/* 密碼顯示米號 */}
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

export default AdminInput;
