import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getChangeAccount } from '../../api/setting';
import { getUserData } from '../../api/userprofile';
import Input from '../Input/Input';
import styled from './SettingInput.module.scss';

function SettingInput() {
	// eslint-disable-next-line no-unused-vars
	// const [userOriginData, setUserOriginData] = useState(null);
	// console.log(userOriginData);
	const [accountLength, setAccountLength] = useState(0);
	const [account, setAccount] = useState('');
	const [name, setUsername] = useState('');
	const [nameLength, setNameLength] = useState(0);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [checkPassword, setCheckPassword] = useState('');

	const authToken = localStorage.getItem('authToken');
	const userId = localStorage.getItem('userId');
	const navigate = useNavigate();

	const handleAccountChange = (e) => {
		e.preventDefault();
		const inputValue = e.target.value;
		// 使用正規表達式去除空格
		const inputWithoutSpaces = inputValue.replace(/\s+/g, '');
		const inputLength = inputWithoutSpaces.length;
		setAccount(inputValue);
		setAccountLength(inputLength);
	};

	const handleUserNameChange = (e) => {
		e.preventDefault();
		const inputValue = e.target.value;
		// 使用 trim 刪除 string 前後空白
		const inputWithoutSpaces = inputValue.replace(/\s+/g, '');
		const inputLength = inputWithoutSpaces.length;
		setNameLength(inputLength);
		setUsername(inputWithoutSpaces);
	};

	const handleEmailChange = (e) => {
		e.preventDefault();
		const inputValue = e.target.value;
		// 使用 trim 刪除 string 前後空白
		const inputWithoutSpaces = inputValue.replace(/\s+/g, '');
		setEmail(inputWithoutSpaces);
	};

	const handlePasswordChange = (e) => {
		e.preventDefault();
		const inputValue = e.target.value;
		// 使用 trim 刪除 string 前後空白
		const inputWithoutSpaces = inputValue.trim();
		setPassword(inputWithoutSpaces);
	};

	const handleCheckPasswordChange = (e) => {
		e.preventDefault();
		const inputValue = e.target.value;
		// 使用 trim 刪除 string 前後空白
		const inputWithoutSpaces = inputValue.trim();
		setCheckPassword(inputWithoutSpaces);
	};

	// save button event
	const handleSaveClick = async (e) => {
		e.preventDefault();
		if (account.length === 0) {
			alert('帳號欄位不能為空');
			return;
		} else if (accountLength > 50) {
			alert('帳號字數超過上限!');
			return;
		} else if (nameLength > 50) {
			alert('名稱字數超過上限!');
			return;
		} else if (name.length === 0) {
			alert('名稱欄位不能為空');
			return;
		} else if (email.length === 0) {
			alert('Email 欄位不能為空');
			return;
		} else if (password.length === 0) {
			alert('密碼欄位不能為空');
			return;
		} else if (checkPassword.length === 0) {
			alert('密碼確認欄位不能為空');
			return;
		} else if (password !== checkPassword) {
			alert('密碼與密碼確認輸入值不同');
			return;
		}

		const result = await getChangeAccount(
			userId,
			authToken,
			account,
			email,
			name,
			password,
			checkPassword,
		);

		if (result) {
			// 修改成功訊息
			Swal.fire({
				position: 'top',
				title: '修改成功！',
				timer: 1000,
				icon: 'success',
				showConfirmButton: false,
			});
			setPassword('');
			setCheckPassword('');

			// 更新畫面個人資料
			const data = await getUserData(userId, authToken);
			// setUserOriginData(data);
			setAccount(data.account);
			setUsername(data.name);
			setEmail(data.email);
			return;
		}

		// 修改失敗訊息
		Swal.fire({
			position: 'top',
			title: '修改失敗！',
			timer: 1000,
			icon: 'error',
			showConfirmButton: false,
		});
	};

	// 獲取使用者個人資料
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				if (!authToken) {
					navigate('/login');
					return;
				}
				// 個人資料
				const data = await getUserData(userId, authToken);
				// setUserOriginData(data);
				setAccount(data.account);
				setUsername(data.name);
				setEmail(data.email);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUserData();
	}, []);

	return (
		<div className={styled.inputWrap}>
			<div className={styled.accountInput}>
				<Input
					inputTitle='帳號'
					type='account'
					value={account}
					placeholder='請輸入帳號'
					onChange={handleAccountChange}
				/>

				<div className={styled.countWrap}>
					{/* 增加帳號已有被人註冊的判斷式 */}
					<div>
						<span className={styled.countTitle}>{accountLength > 50 ? '字數超出上限' : ''}</span>
					</div>

					<div>
						<span className={styled.countNumber}>
							{accountLength <= 0 ? '' : `字數: ${accountLength} / 50`}
						</span>
					</div>
				</div>
			</div>

			<div className={styled.accountInput}>
				<Input
					inputTitle='名稱'
					type='name'
					value={name}
					placeholder='請輸入名稱'
					onChange={handleUserNameChange}
				/>

				<div className={styled.countWrap}>
					{/* 增加帳號已有被人註冊的判斷式 */}
					<div>
						<span className={styled.countTitle}>{nameLength > 50 ? '字數超出上限' : ''}</span>
					</div>

					<div>
						<span className={styled.countNumber}>
							{nameLength <= 0 ? '' : `字數: ${nameLength} / 50`}
						</span>
					</div>
				</div>
			</div>

			<Input
				inputTitle='Email'
				type='email'
				value={email}
				placeholder='請輸入 Email'
				onChange={handleEmailChange}
			/>
			<Input
				inputTitle='密碼'
				type='password'
				value={password}
				placeholder='請設定密碼'
				onChange={handlePasswordChange}
			/>
			<Input
				inputTitle='密碼再確認'
				type='password'
				value={checkPassword}
				placeholder='請再次輸入密碼'
				onChange={handleCheckPasswordChange}
			/>
			{/* 儲存按鈕 */}
			<div className={styled.buttonWrap}>
				<button className={styled.saveButton} onClick={handleSaveClick}>
					儲存
				</button>
			</div>
		</div>
	);
}

export default SettingInput;
