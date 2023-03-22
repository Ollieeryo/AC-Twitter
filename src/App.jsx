import Login from './pages/Login/Index';
import Main from './pages/Main/Index';
import './App.scss';
import Register from './pages/Register/Index';
import Admin from './pages/Admin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<div className='app'>
			<BrowserRouter>
				<Routes>
					<Route path='admin' element={<Admin />} />
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
					<Route path='*' element={<Main />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
