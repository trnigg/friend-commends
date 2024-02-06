// TODO in CSS: Format so component stack vertically on mobile
// Breakpoint so that elements stack but are next to forms on desktop

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth';
import Login from '../components/login'; // Import your Login component
import Signup from '../components/signUp'; // Import your Signup component

function LandingPage({ setIsLoggedIn }) {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(true); // State variable to keep track of login/signup state

	const handleAuth = async (event) => {
		event.preventDefault();
		// Perform login or signup here using AuthService
		// If operation is successful, update isLoggedIn and redirect to another page
		const loggedIn = isLogin
			? await AuthService.login()
			: await AuthService.signup();
		if (loggedIn) {
			setIsLoggedIn(true);
			navigate('/for_you');
		}
	};

	const toggleLoginSignup = () => {
		setIsLogin(!isLogin); // Toggle between login and signup
	};

	return (
		<div>
			<h1>Welcome to Our App</h1>
			<p>This is a description of our app.</p>
			{isLogin ? (
				<Login onSignupClick={toggleLoginSignup} handleAuth={handleAuth} /> // Render Login component if isLogin is true
			) : (
				<Signup onLoginClick={toggleLoginSignup} handleAuth={handleAuth} /> // Render Signup component if isLogin is false
			)}
		</div>
	);
}

export default LandingPage;
