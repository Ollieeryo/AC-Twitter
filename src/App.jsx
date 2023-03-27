import Login from './pages/Login/Index';
import Main from './pages/Main/Index';
import './App.scss';
import Register from './pages/Register/Index';
import Admin from './pages/Admin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import TweetModal from './components/TweetModal/TweetModal';
// import ReplyModal from './components/ReplyModal/ReplyModal';

import AdminMain from './pages/AdminMain/Index';
import { AuthProvider } from './contexts/AuthContext';
import { AuthSignUpProvider } from './contexts/AuthSignUpContext';

function App() {
	return (
		<AuthProvider>
			<AuthSignUpProvider>
				<div className='app'>
					<BrowserRouter>
						<Routes>
							<Route path='admin' element={<Admin />} />
							<Route path='login' element={<Login />} />
							<Route path='register' element={<Register />} />
							<Route path='*' element={<Main />} />
							<Route path='admin/main' element={<AdminMain />} />
							{/* <Route path='tweet' element={<TweetModal />} />
							<Route path='reply' element={<ReplyModal />} /> */}
						</Routes>
					</BrowserRouter>
				</div>
			</AuthSignUpProvider>
		</AuthProvider>
	);
}

export default App;
