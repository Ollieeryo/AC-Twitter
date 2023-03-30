import Login from './pages/Login/Index';
import Main from './pages/Main/Index';
import './App.scss';
import Register from './pages/Register/Index';
import Admin from './pages/Admin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
							<Route path='main' element={<Main />} />
							<Route path='admin/main' element={<AdminMain />} />
							{/* <Route path='TweetModal' element={<TweetModal />} /> */}
						</Routes>
					</BrowserRouter>
				</div>
			</AuthSignUpProvider>
		</AuthProvider>
	);
}

export default App;
