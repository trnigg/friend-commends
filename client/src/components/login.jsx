import { useState, useEffect } from 'react';
import { Form, Button, Message, Icon } from 'semantic-ui-react';
import { MUTATION_LOGIN } from '../utils/mutations';
import { useMutation } from '@apollo/client';

function Login({ onAuthenticated }) {
	const [login, { error, data }] = useMutation(MUTATION_LOGIN);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (error) {
			console.log(error);
		}
		if (data) {
			onAuthenticated(data.login.token);
		}
	}, [error, data, onAuthenticated]);

	const tryLogin = async (e) => {
		e.preventDefault();
		try {
			await login({
				variables: { input: { email, password } },
			});
		} catch (err) {
			console.log(err);
		}
	};

	// Error translator
	// Use error.message from Apollo to display a user-friendly error
	// If error message is re. user auth, display a friendly message
	// Any other error message from appollo will be displayed as is for debugging
	function getUserFriendlyError(error) {
		switch (error.message) {
			case 'Could not authenticate user.':
				return 'Invalid email or password. Please try again.';
			default:
				return error.message; // Return the original error message from Apollo
		}
	}

	return (
		<div>
			<h1> Login</h1>
			{/* Display error message conditional if error, using "error-translator"*/}
			{error && (
				<Message error header="Oops!" content={getUserFriendlyError(error)} />
			)}
			<Form onSubmit={tryLogin} autoComplete="off">
				<Form.Field>
					<label htmlFor="email">Email</label>
					<Form.Input
						type="text"
						id="email"
						value={email}
						onInput={(e) => setEmail(e.target.value)}
					/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="password">Password</label>
					<Form.Input
						type="password"
						id="password"
						value={password}
						onInput={(e) => setPassword(e.target.value)}
					/>
				</Form.Field>
				<Button basic primary type="submit">
					<Icon name="sign in" />
					Login
				</Button>
			</Form>
		</div>
	);
}

export default Login;
