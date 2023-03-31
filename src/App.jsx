import Login from './pages/Login/Index';
import Main from './pages/Main/Index';
import './App.scss';
import Register from './pages/Register/Index';
import Admin from './pages/Admin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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

	return (
		<AuthProvider>
			<AuthSignUpProvider>
				<div className='app'>
					<BrowserRouter>
						<Routes>
							<Route path='*' element={<Home />} />
							<Route path='admin' element={<Admin />} />
							<Route path='login' element={<Login />} />
							<Route path='register' element={<Register />} />
							<Route path='*' element={<Main />} />
							<Route path='admin/main' element={<AdminMain />} />
						</Routes>
					</BrowserRouter>
				</div>
			</AuthSignUpProvider>
		</AuthProvider>
	);
}

export default App;
