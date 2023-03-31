import Login from './pages/Login/Index';
import Main from './pages/Main/Index';
import './App.scss';
import Register from './pages/Register/Index';
import Admin from './pages/Admin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TweetModal from './components/TweetModal/TweetModal';
import ReplyModal from './components/ReplyModal/ReplyModal';
import { useEffect } from 'react';
import AdminMain from './pages/AdminMain/Index';
import { AuthProvider } from './contexts/AuthContext';
import { AuthSignUpProvider } from './contexts/AuthSignUpContext';
import Home from './pages/Home';

function App() {
	const handleRefresh = (e) => {
		e.preventDefault();
		location.reload();
	};

	useEffect(() => {
		window.addEventListener('beforeunload', handleRefresh);

		return () => {
			window.removeEventListener('beforeunload', handleRefresh);
		};
	}, []);

	// eslint-disable-next-line no-undef
	const basename = process.env.PUBLIC_URL;

	return (
		<AuthProvider>
			<AuthSignUpProvider>
				<div className='app'>
					<BrowserRouter basename={basename}>
						<Routes>
							<Route path='*' element={<Home />} />
							<Route path='admin' element={<Admin />} />
							<Route path='login' element={<Login />} />
							<Route path='register' element={<Register />} />
							<Route path='main' element={<Main />} />
							<Route path='admin/main' element={<AdminMain />} />
							<Route path='tweet' element={<TweetModal />} />
							<Route path='replymodal' element={<ReplyModal />} />
						</Routes>
					</BrowserRouter>
				</div>
			</AuthSignUpProvider>
		</AuthProvider>
	);
}

export default App;
