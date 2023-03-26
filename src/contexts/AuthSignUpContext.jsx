import { createContext, useContext, useState } from 'react';

// 定義 context
const AuthSignUpContext = createContext();

export const AuthSignUpProvider = ({ children }) => {
	const [accountLength, setAccountLength] = useState(0);
	const [account, setAccount] = useState('');
	const [name, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [checkPassword, setCheckPassword] = useState('');

	const handleAccountChange = (e) => {
		const inputValue = e.target.value;
		// 使用正規表達式去除空格
		const inputWithoutSpaces = inputValue.replace(/\s+/g, '');
		const inputLength = inputWithoutSpaces.length;
		setAccount(inputValue);
		setAccountLength(inputLength);
	};

	const handleUserNameChange = (e) => {
		const inputValue = e.target.value;
		// 使用 trim 刪除 string 前後空白
		const inputWithoutSpaces = inputValue.trim();
		setUsername(inputWithoutSpaces);
	};

	const handleEmailChange = (e) => {
		const inputValue = e.target.value;
		// 使用 trim 刪除 string 前後空白
		const inputWithoutSpaces = inputValue.trim();
		setEmail(inputWithoutSpaces);
	};

	const handlePasswordChange = (e) => {
		const inputValue = e.target.value;
		// 使用 trim 刪除 string 前後空白
		const inputWithoutSpaces = inputValue.trim();
		setPassword(inputWithoutSpaces);
	};

	const handleCheckPasswordChange = (e) => {
		const inputValue = e.target.value;
		// 使用 trim 刪除 string 前後空白
		const inputWithoutSpaces = inputValue.trim();
		setCheckPassword(inputWithoutSpaces);
	};

	const value = {
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
	};

	return <AuthSignUpContext.Provider value={value}>{children}</AuthSignUpContext.Provider>;
};

// 使用 useContext Hook
export const useAuthSignUp = () => {
	const AuthData = useContext(AuthSignUpContext);
	return AuthData;
};
