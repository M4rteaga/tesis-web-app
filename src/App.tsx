import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './routes/Home';
import Profile from './routes/Profile';
import React from 'react';
import { Provider, useAtom } from 'jotai';
import { isAuthenticatedAtom } from './store';

function App() {
	return (
		<Provider>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="profile"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Provider>
	);
}

const ProtectedRoute: React.FC<{
	children: JSX.Element;
}> = ({ children }) => {
	// const { isAuthenticated } = useAuth();
	const [isAuthenticated] = useAtom(isAuthenticatedAtom);
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return children;
};

export default App;
