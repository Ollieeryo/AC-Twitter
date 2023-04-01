import { createContext, useContext, useState } from 'react';

// 定義 context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [accountLength, setAccountLength] = useState(0);
	const [account, setAccount] = useState('');
	const [password, setPassword] = useState('');
	const [userData, setUserData] = useState([]);
	const [userTweets, setUserTweets] = useState([]);
	const [userReplyTweets, setUserReplyTweets] = useState([]);
	const [userLikeTweets, setUserLikeTweets] = useState([]);
	const [buttonStatus, setButtonStatus] = useState('推文');

	const handleAccountChange = (e) => {
		const inputValue = e.target.value;
		// 使用正規表達式去除空格
		const inputWithoutSpaces = inputValue.replace(/\s+/g, '');
		const inputLength = inputWithoutSpaces.length;
		setAccount(inputValue);
		setAccountLength(inputLength);
	};

	const handlePasswordChange = (e) => {
		const inputValue = e.target.value;
		// 使用 trim 刪除 string 前後空白
		const inputWithoutSpaces = inputValue.trim();
		setPassword(inputWithoutSpaces);
	};

	const value = {
		accountLength,
		setAccountLength,
		account,
		setAccount,
		password,
		setPassword,
		handleAccountChange,
		handlePasswordChange,
		userData,
		setUserData,
		userTweets,
		setUserTweets,
		userReplyTweets,
		setUserReplyTweets,
		userLikeTweets,
		setUserLikeTweets,
		buttonStatus,
		setButtonStatus,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 使用 useContext Hook
export const useAuthLogin = () => {
	const AuthData = useContext(AuthContext);
	return AuthData;
};
