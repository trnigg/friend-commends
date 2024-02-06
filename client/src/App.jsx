import { useState, useEffect } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';

// For authentication
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/navbar.jsx';
import AuthService from './utils/auth.js'; // Import your AuthService
import LandingPage from './pages/LandingPage.jsx'; // Import your LandingPage component

// Constructs main GraphQL API endpoint
const httpLink = createHttpLink({
	uri: '/graphql',
});

// Constructs request middleware to attach JWT as `authorization` header to every request
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	// executes `authLink` middleware prior every request to GraphQL API
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(AuthService.loggedIn()); // Set initial state based on AuthService

	useEffect(() => {
		// Update isLoggedIn when AuthService changes
		const checkLoginStatus = () => {
			setIsLoggedIn(AuthService.loggedIn());
		};

		window.addEventListener('storage', checkLoginStatus);

		return () => {
			window.removeEventListener('storage', checkLoginStatus);
		};
	}, []);

	return (
		<ApolloProvider client={client}>
			<div className="contentDiv">
				{isLoggedIn ? (
					<>
						<Navbar />
						<Outlet />
					</>
				) : (
					<LandingPage setIsLoggedIn={setIsLoggedIn} /> // Render LandingPage if not logged in
				)}
			</div>
		</ApolloProvider>
	);
}

export default App;
