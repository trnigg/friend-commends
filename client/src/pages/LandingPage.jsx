// TODO in CSS: Format with breakpoints so component stack vertically on mobile, and horizontally on larger screens.
// TODO: Use more semantic HTML elements where possible
// TODO: Update logo and remove inline styles, update alt text

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../utils/auth';
import Login from '../components/login'; // Import your Login component
import Signup from '../components/signUp'; // Import your Signup component

import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';

// TODO: Replace logo with our logo. Preferably a .svg file or png with transparent background
import Logo from '../assets/images/logo.jpg';

function LandingPage({ setIsLoggedIn }) {
	// recieve setIsLoggedIn as a prop to update state in App.jsx
	const navigate = useNavigate(); // navigate to another page after successful login
	const [isLogin, setIsLogin] = useState(true); // State variable to keep track of login/signup state

	const handleAuth = async (token) => {
		// Perform login or signup here using AuthService
		// If operation is successful, update isLoggedIn and redirect to another page
		// If isLogin is true, call login method from Auth
		// If isLogin is false, call  signup method from Auth
		// The result is stored in the loggedIn variable
		const loggedIn = isLogin
			? await AuthService.login(token)
			: await AuthService.signup(token);

		// If the user is successfully logged in or signed up (i.e., loggedIn is true)
		if (loggedIn) {
			// Update isLoggedIn state to true
			setIsLoggedIn(true);
			// Navigate
			navigate('/for_you');
		}
	};

	const toggleLoginSignup = () => {
		setIsLogin(!isLogin); // Toggle between login and signup
	};

	return (
		<Container className="landing-page">
			<Header as="h1">Welcome to Our App</Header>
			<Image
				src={Logo}
				alt="Logo"
				className="logo"
				style={{ width: '300px', height: 'auto' }}
			/>{' '}
			{/* Add your logo here */}
			<p>This is a description of our app.</p>
			<Segment>
				{isLogin ? (
					<Login onAuthenticated={handleAuth} />
				) : (
					<Signup onAuthenticated={handleAuth} />
				)}
			</Segment>
			<Button onClick={toggleLoginSignup}>
				{isLogin ? 'Need to create an account?' : 'Already have an account?'}
			</Button>
		</Container>
	);
}

export default LandingPage;
