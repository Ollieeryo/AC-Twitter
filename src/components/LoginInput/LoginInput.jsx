import { useState } from 'react';
import Input from '../Input/Input';
import MainButton from '../MainButton/MainButton';
import styled from './LoginInput.module.scss';

function LoginInput() {
	const [accountLength, setAccountLength] = useState(0);
	// const [account, setAccount] = useState(0);
	const [password, setPassword] = useState(0);

	const handleAccountChange = (e) => {
		e.preventDefault();
		const inputValue = e.target.value;
		// 使用正規表達式去除空格
		const inputWithoutSpaces = inputValue.replace(/\s+/g, '');
		const inputLength = inputWithoutSpaces.length;
		setAccountLength(inputLength);
	};

	const handlePasswordChange = (e) => {
		e.preventDefault();
		const inputValue = e.target.value;
		// 使用正規表達式去除空格
		const inputWithoutSpaces = inputValue.trim();
		setPassword(inputWithoutSpaces);
	};

	const handleFormSubmit = (e) => {
		if (accountLength === 0) {
			e.preventDefault();
			alert('帳號欄位不能為空');
		}
		if (password.length === 0) {
			alert('密碼欄位不能為空');
		}
	};

	return (
		<div className={styled.inputCon}>
			<div className={styled.inputWrap}>
				<Input inputTitle='帳號' placeholder='請輸入帳號' onChange={handleAccountChange} />

				<div className={styled.countWrap}>
					{/* 帳號不存在的 span 判斷式 */}
					<span className={styled.countTitle}>{accountLength > 50 ? '字數超出上限' : ''}</span>
					<span className={styled.countNumber}>
						{accountLength <= 0 ? '' : `字數: ${accountLength} / 50`}
					</span>
				</div>
			</div>

			{/* 密碼顯示米號 */}
			<div className={styled.inputWrap}>
				<Input inputTitle='密碼' placeholder='請輸入密碼' onChange={handlePasswordChange} />
			</div>

			<MainButton buttonTitle='登入' onClick={handleFormSubmit} />
		</div>
	);
}

export default LoginInput;
