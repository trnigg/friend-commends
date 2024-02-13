import React, { useRef } from 'react';
import {
	ModalHeader,
	ModalDescription,
	ModalContent,
	ModalActions,
	Button,
	Header,
	Image,
	Modal,
	Icon,
	Message,
	Form,
	FormGroup,
	FormField,
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { MUTATION_EDITPROFILE } from '../utils/selfMutations';
import { QUERY_MYDETAILS } from '../utils/selfQueries';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';

function UpdateProfileModal({ ...props }) {
	//console.log("props:", props);
	//Date.toISOString() returns date in format "1975-08-19T23:15:30.000Z"
	//In order to display date in Semantic form, transform ISO format into "yyyy-MM-dd"
	const birthday = new Date(parseInt(props.dateOfBirth, 10))
		.toISOString()
		.split('T')[0];
	//console.log(birthday)

	const [errorMsg, setErrorMsg] = useState(false);
	const [successMsg, setSuccessMsg] = useState(false);
	const [open, setOpen] = useState(false);
	const [userName, setUserName] = useState(props.userName);
	const [userNameError, setUserNameError] = useState(false);
	const [firstName, setFirstName] = useState(props.firstName);
	const [firstNameError, setFirstNameError] = useState(false);
	const [lastName, setLastName] = useState(props.lastName);
	const [lastNameError, setLastNameError] = useState(false);
	const [email, setEmail] = useState(props.email);
	const [emailError, setEmailError] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
	const [dob, setDob] = useState(birthday);
	const [dobError, setDobError] = useState(false);

	const [confirmPassword, setConfirmPassword] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState(false);
	const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
		useState('');

	const [updateUser, { error: movieErr }] = useMutation(MUTATION_EDITPROFILE, {
		refetchQueries: [{ query: QUERY_USER }, { query: QUERY_MYDETAILS }],
	});

	let updateUserVariable = useRef({});
	const handleInputChange = async (e) => {
		const { target } = e;
		const inputType = target.name;
		const inputValue = target.value;
		switch (inputType) {
			case 'userName':
				setUserName(inputValue);
				updateUserVariable.current.userName = inputValue;
				break;
			case 'firstName':
				setFirstName(inputValue);
				updateUserVariable.current.firstName = inputValue;
				break;
			case 'lastName':
				setLastName(inputValue);
				updateUserVariable.current.lastName = inputValue;
				break;
			case 'email':
				setEmail(inputValue);
				updateUserVariable.current.email = inputValue;
				break;
			case 'dateOfBirth':
				setDob(inputValue);
				updateUserVariable.current.dateOfBirth = inputValue;
				break;
			case 'password':
				setPassword(inputValue);
				updateUserVariable.current.password = inputValue;
				break;
			default:
				break;
		}

		console.log('updateUserVariable', updateUserVariable);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		//console.log("test button click");

		const token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			return false;
		}

		// Reset error states for empty fields
		setUserNameError(false);
		setFirstNameError(false);
		setLastNameError(false);
		setEmailError(false);
		setPasswordError(false);
		setDobError(false);
		setConfirmPasswordError(false);

		if (password !== confirmPassword) {
			setConfirmPasswordError(true);
			setConfirmPasswordErrorMessage('Passwords do not match');
		}

		try {
			await updateUser({
				variables: {
					updateUserInput2: updateUserVariable.current,
				},
			});
			updateUserVariable.current = {};
			console.log('updateUserVariable', updateUserVariable.current);
			setSuccessMsg(true);
			setErrorMsg(false);
		} catch (err) {
			console.log(err);
			setSuccessMsg(false);
			setErrorMsg(true);
		}
	};

	return (
		<Modal
			closeIcon
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			trigger={
				<Button basic primary>
					<Icon name="edit" />
					Update your profile
				</Button>
			}
		>
			<ModalHeader>Update your profile!</ModalHeader>
			<Message
				onDismiss={() => {
					setErrorMsg(false);
				}}
				hidden={!errorMsg}
				color="red"
			>
				Unable to update your details at the moment. Please try again later.
			</Message>
			<Message
				onDismiss={() => {
					setSuccessMsg(false);
				}}
				hidden={!successMsg}
				color="green"
			>
				Updated successfully!
			</Message>
			<ModalContent>
				<ModalDescription>
					<Header>What do you want to update?</Header>
					<Form id="update-form" onSubmit={handleFormSubmit}>
						<FormField
							id="form-input-control-username"
							control={Form.Input}
							label="Username"
							placeholder="Username"
							name="userName"
							value={userName}
							//onInput={(e) => setUserName(e.target.value)}
							onInput={handleInputChange}
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
								name="firstName"
								value={firstName}
								onInput={handleInputChange}
								error={
									firstNameError
										? {
												content: 'Please enter a first name',
												pointing: 'above',
										  }
										: null
								}
							/>
							<FormField
								id="form-input-control-last-name"
								control={Form.Input}
								label="Last Name"
								placeholder="Last Name"
								name="lastName"
								value={lastName}
								onInput={handleInputChange}
								error={
									lastNameError
										? { content: 'Please enter a last name', pointing: 'above' }
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
							name="email"
							value={email}
							onInput={handleInputChange}
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
								name="password"
								value={password}
								onInput={handleInputChange}
								error={
									passwordError
										? { content: passwordErrorMessage, pointing: 'above' }
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
										? {
												content: confirmPasswordErrorMessage,
												pointing: 'above',
										  }
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
							name="dateOfBirth"
							value={dob}
							onInput={handleInputChange}
							error={
								dobError
									? {
											content: 'Please enter a date of birth',
											pointing: 'below',
									  }
									: null
							}
						/>
					</Form>
				</ModalDescription>
			</ModalContent>
			<ModalActions>
				<Button basic negative onClick={() => setOpen(false)}>
					<Icon name="cancel" />
					Cancel
				</Button>
				<Button basic positive type="submit" form="update-form">
					<Icon name="save" />
					Save
				</Button>
			</ModalActions>
			x
		</Modal>
	);
}

export default UpdateProfileModal;
