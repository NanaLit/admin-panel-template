import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeProvider from './context/ThemeProvider';
import { AuthProvider } from './context/AuthProvider';
import RequireAuth from './utils/RequireAuth';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './pages/Login/Login';

function App() {
	return (
		<AuthProvider>
			<Router>
				<ThemeProvider>
					<Routes>
						<Route
							path="/dashboard"
							element={
								<RequireAuth>
									<Dashboard />
								</RequireAuth>
							}
							/>
						<Route
							path="/"
							element={
								<RequireAuth>
									<Dashboard />
								</RequireAuth>
							}
							/>
						<Route path="/login" element={<Login />} />
					</Routes>
				</ThemeProvider>
			</Router>
		</AuthProvider>
	);
}

export default App;
