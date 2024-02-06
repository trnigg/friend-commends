import { useState, useEffect } from 'react';
import { Button, Form, FormField, Message } from 'semantic-ui-react';
import { MUTATION_ADDUSER } from '../utils/mutations';
import { useMutation } from '@apollo/client';

function SignUp({ onAuthenticated }) {
	const [addUser, { error, data }] = useMutation(MUTATION_ADDUSER);
	const [userName, setUserName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [dob, setDob] = useState('');

	useEffect(() => {
		if (error) {
			console.log(error);
		}
		if (data) {
			onAuthenticated(data.addUser.token);
		}
	}, [error, data, onAuthenticated]);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			await addUser({
				variables: {
					input: {
						userName,
						firstName,
						lastName,
						email,
						password,
						dateOfBirth: dob,
					},
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<h2>Sign up</h2>
			{error && (
				<Message
					error
					header="Error"
					content={getFriendlyErrorMessage(error)}
				/>
			)}
			<Form onSubmit={handleFormSubmit}>
				<FormField>
					<label htmlFor="userName">Username</label>
					<Form.Input
						type="text"
						id="userName"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</FormField>
				<FormField>
					<label htmlFor="firstName">First Name</label>
					<Form.Input
						type="text"
						id="firstName"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</FormField>
				<FormField>
					<label htmlFor="lastName">Last Name</label>
					<Form.Input
						type="text"
						id="lastName"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</FormField>
				<FormField>
					<label htmlFor="email">Email</label>
					<Form.Input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</FormField>
				<FormField>
					<label htmlFor="password">Password</label>
					<Form.Input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormField>
				<FormField>
					<label htmlFor="dob">Date of Birth</label>
					<Form.Input
						type="date"
						id="dob"
						value={dob}
						onChange={(e) => setDob(e.target.value)}
					/>
				</FormField>
				<Button type="submit">Add User</Button>
			</Form>
		</div>
	);
}

function getFriendlyErrorMessage(error) {
	switch (error.message) {
		case 'Could not authenticate user.':
			return 'Invalid details. Please try again.';
		default:
			return error.message;
	}
}

export default SignUp;
