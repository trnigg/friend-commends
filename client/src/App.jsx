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
	const [user, setUser] = useState({}); // to pass basic user information to navbar

	// Check if user is logged in when component mounts and when localStorage changes
	useEffect(() => {
		// Update isLoggedIn when AuthService changes
		const checkLoginStatus = () => {
			setIsLoggedIn(AuthService.loggedIn());
			if (AuthService.loggedIn()) {
				// If logged in, get user profile and set user state to pass to navbar
				const profile = AuthService.getProfile();
				setUser(profile.data); // jwt decoding is returning an object with a data property
			}
		};

		// call checkLoginStatus when component mounts to get profile of logged in user
		checkLoginStatus();

		// add event listener to checkLoginStatus when localStorage changes
		window.addEventListener('storage', checkLoginStatus);

		// cleanup function to remove event listener
		//https://stackoverflow.com/questions/55360736/how-do-i-window-removeeventlistener-using-react-useeffect
		return () => {
			window.removeEventListener('storage', checkLoginStatus);
		};
	}, []);

	// Props to pass to navbar which will contain the logout button
	const handleLogout = () => {
		AuthService.logout();
		setIsLoggedIn(false);
	};

	return (
		<ApolloProvider client={client}>
			<div className="contentDiv">
				{isLoggedIn ? (
					<>
						<Navbar handleLogout={handleLogout} user={user} />
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
