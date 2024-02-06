// NOTE auth is handles on landing page and app.js, passing as prop here
// This handles the login form and the login mutation

import { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { MUTATION_LOGIN } from '../utils/mutations';
// import auth from '../utils/auth';
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
			// onAuthenticated is a prop passed from LandingPage rather than AuthService
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

	return (
		<div>
			<h1> Login</h1>
			<Form onSubmit={tryLogin}>
				<Form.Field>
					<label htmlFor="email">Email</label>
					<Form.Input
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="password">Password</label>
					<Form.Input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Field>
				<Button type="submit">Login</Button>
			</Form>
		</div>
	);
}

export default Login;
