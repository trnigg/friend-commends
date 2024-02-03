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

import Navbar from './components/Navbar';

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
	return (
		<ApolloProvider client={client}>
			<div className='contentDiv'>
			<Navbar />
			<Outlet />
			</div>
		</ApolloProvider>
	);
}

export default App;
