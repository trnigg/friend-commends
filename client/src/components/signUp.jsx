// TODO: Refactor error handling. It's spaghetti.
// TODO: Additional error handling for email, password, (possibly date of birth) requirements is needed.
// TODO: Add global form validation message/translate messages from Apollo.

import { useState, useEffect } from 'react';
import { Button, Form, FormField, Message, FormGroup } from 'semantic-ui-react';
import { MUTATION_ADDUSER } from '../utils/mutations';
import { useMutation } from '@apollo/client';

function SignUp({ onAuthenticated }) {
	const [addUser, { error, data }] = useMutation(MUTATION_ADDUSER);
	const [userName, setUserName] = useState('');
	const [userNameError, setUserNameError] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [firstNameError, setFirstNameError] = useState(false);
	const [lastName, setLastName] = useState('');
	const [lastNameError, setLastNameError] = useState(false);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
	const [dob, setDob] = useState('');
	const [dobError, setDobError] = useState(false);

	const [confirmPassword, setConfirmPassword] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState(false);
	const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
		useState('');

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

		// Reset error states for empty fields
		setUserNameError(false);
		setFirstNameError(false);
		setLastNameError(false);
		setEmailError(false);
		setPasswordError(false);
		setDobError(false);
		setConfirmPasswordError(false);

		// Check if any field is empty
		if (!userName) setUserNameError(true);
		if (!firstName) setFirstNameError(true);
		if (!lastName) setLastNameError(true);
		if (!email) setEmailError(true);
		if (!password) setPasswordError(true);
		if (!dob) setDobError(true);
		if (!confirmPassword) setConfirmPasswordError(true);

		// Check if password and confirm password fields are both empty
		if (!password && !confirmPassword) {
			setPasswordError(true);
			setConfirmPasswordError(true);
			// Set custom error messages
			setPasswordErrorMessage('Please enter a new password');
			setConfirmPasswordErrorMessage('Please confirm your password');
		} else {
			// Check if password and confirm password fields match
			if (password !== confirmPassword) {
				setConfirmPasswordError(true);
				setConfirmPasswordErrorMessage('Passwords do not match');
			}
		}

		// If any field is empty, stop form submission
		// COuld also be handled with global form validation state
		// e.g const [formError, setFormError] = useState(false);

		if (
			!userName ||
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!dob ||
			password !== confirmPassword
		)
			return;

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

	// Using Semantic React built in form valdiation for each field
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
				<FormField
					id="form-input-control-username"
					control={Form.Input}
					label="Username"
					placeholder="Username"
					value={userName}
					onInput={(e) => setUserName(e.target.value)}
					error={
						userNameError
							? { content: 'Please enter a username', pointing: 'below' }
							: null
					}
				/>
				<FormGroup widths="equal">
					<FormField
						id="form-input-control-first-name"
						control={Form.Input}
						label="First Name"
						placeholder="First Name"
						value={firstName}
						onInput={(e) => setFirstName(e.target.value)}
						error={
							firstNameError
								? { content: 'Please enter a first name', pointing: 'below' }
								: null
						}
					/>
					<FormField
						id="form-input-control-last-name"
						control={Form.Input}
						label="Last Name"
						placeholder="Last Name"
						value={lastName}
						onInput={(e) => setLastName(e.target.value)}
						error={
							lastNameError
								? { content: 'Please enter a last name', pointing: 'below' }
								: null
						}
					/>
				</FormGroup>
				<FormField
					id="form-input-control-email"
					control={Form.Input}
					type="email"
					label="Email"
					placeholder="Email"
					value={email}
					onInput={(e) => setEmail(e.target.value)}
					error={
						emailError
							? { content: 'Please enter an email', pointing: 'below' }
							: null
					}
				/>
				<FormGroup widths="equal">
					<FormField
						id="form-input-control-password"
						control={Form.Input}
						type="password"
						label="New Password"
						placeholder="New Password"
						value={password}
						onInput={(e) => setPassword(e.target.value)}
						error={
							passwordError
								? { content: passwordErrorMessage, pointing: 'below' }
								: null
						}
					/>
					<FormField
						id="form-input-control-confirm-password"
						control={Form.Input}
						type="password"
						label="Confirm Password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onInput={(e) => setConfirmPassword(e.target.value)}
						error={
							confirmPasswordError
								? { content: confirmPasswordErrorMessage, pointing: 'below' }
								: null
						}
					/>
				</FormGroup>
				<FormField
					id="form-input-control-dob"
					control={Form.Input}
					type="date"
					label="Date of Birth"
					placeholder="Date of Birth"
					value={dob}
					onInput={(e) => setDob(e.target.value)}
					error={
						dobError
							? { content: 'Please enter a date of birth', pointing: 'below' }
							: null
					}
				/>
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
