// TODO in CSS: Format with breakpoints so component stack vertically on mobile, and horizontally on larger screens.
// TODO: Use more semantic HTML elements where possible
// TODO: Update logo and remove inline styles, update alt text

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth';
import Login from '../components/login'; // Import your Login component
import Signup from '../components/signUp'; // Import your Signup component

// TODO: Replace logo with our logo. Preferably a .svg file or png with transparent background
import Logo from '../assets/images/logo.jpg';

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
		<div className="landing-page">
			<div className="text-content">
				<h1>Welcome to Our App</h1>
				<img
					src={Logo}
					alt="Logo"
					className="logo"
					style={{ width: '300px', height: 'auto' }}
				/>{' '}
				{/* Add your logo here */}
				<p>This is a description of our app.</p>
			</div>
			{isLogin ? (
				<Login onSignupClick={toggleLoginSignup} handleAuth={handleAuth} />
			) : (
				<Signup onLoginClick={toggleLoginSignup} handleAuth={handleAuth} />
			)}
		</div>
	);
}

export default LandingPage;
