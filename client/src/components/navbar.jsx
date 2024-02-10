// TODO - move inline CSS to a separate file search "style" tags in jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sidebar, Icon, Header } from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive'; // allows us to use media queries in our components
import { QUERY_MYDETAILS } from '../utils/selfQueries';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom'; // to get the current location and set the active item in the menu

// Pass in handleLogout and  as a prop from App.jsx
function Navbar({ handleLogout, user }) {
	//console.log("user:", user);
	const isMobile = useMediaQuery({ maxWidth: 901 });
	const [sidebarVisible, setSidebarVisible] = useState(false);
	const { loading, error, data } = useQuery(QUERY_MYDETAILS);

	const location = useLocation(); // to get the current location and set the active item in the menu

	if (loading) {
		return <div>Please Wait.....</div>;
	}
	//console.log("data:", data);
	let firstName, lastName, userName;
	if (data && data.myDetails) {
		firstName = data.myDetails.firstName;
		lastName = data.myDetails.lastName;
		userName = data.myDetails.userName;
	} else {
		firstName = user.firstName;
		lastName = user.lastName;
		userName = user.userName;
	}

	const handleSidebarHide = () => setSidebarVisible(false);
	const handleSidebarShow = () => setSidebarVisible(true);

	// find out whether the screen is mobile or not

	// render appropriate header based on whether the screen is mobile or not
	return (
		<div>
			{isMobile ? (
				<>
					<Menu as="nav" size="large" style={{ marginBottom: '1rem' }}>
						<Menu.Item header>Friend-commend</Menu.Item>
						<Menu.Item
							position="right"
							active={sidebarVisible}
							onClick={handleSidebarShow}
						>
							{' '}
							{/* Moved onClick here */}
							<Icon name="sidebar" />
						</Menu.Item>
					</Menu>
					<Sidebar
						as={Menu}
						animation="overlay"
						onHide={handleSidebarHide}
						visible={sidebarVisible}
						vertical
						width="thin"
						size="large"
					>
						<Menu.Item
							as={Link}
							to="/user"
							onClick={handleSidebarHide}
							active={location.pathname === '/user'}
						>
							<Icon name="user circle" />
							<div>
								<strong>
									{firstName} {lastName}
								</strong>
								<p>{userName}</p>
							</div>
						</Menu.Item>
						<Menu.Item
							as={Link}
							to="/"
							onClick={handleSidebarHide}
							active={location.pathname === '/'}
						>
							<Icon name="home" /> For You
						</Menu.Item>
						<Menu.Item
							as={Link}
							to="/movies"
							onClick={handleSidebarHide}
							active={location.pathname === '/movies'}
						>
							<Icon name="film" /> Movies
						</Menu.Item>
						<Menu.Item
							as={Link}
							to="/tv_shows"
							onClick={handleSidebarHide}
							active={location.pathname === '/tv_shows'}
						>
							<Icon name="tv" /> TV Shows
						</Menu.Item>
						<Menu.Item
							as={Link}
							to="/books"
							onClick={handleSidebarHide}
							active={location.pathname === '/books'}
						>
							<Icon name="book" /> Books
						</Menu.Item>
						<Menu.Item
							as={Link}
							to="/friends"
							onClick={handleSidebarHide}
							active={location.pathname === '/friends'}
						>
							<Icon name="users" /> Friends
						</Menu.Item>
						<Menu.Item onClick={handleLogout}>
							<Icon name="sign out" /> Logout
						</Menu.Item>
					</Sidebar>
				</>
			) : (
				<Menu as="nav" size="large" style={{ marginBottom: '1rem' }}>
					<Menu.Item header>Friend-commend</Menu.Item>
					<div
						style={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}
					>
						<Menu.Item
							as={Link}
							to="/user"
							active={location.pathname === '/user'}
						>
							<Icon name="user circle" />
							<strong>
								{firstName} {lastName}
							</strong>
						</Menu.Item>
						<Menu.Item as={Link} to="/" active={location.pathname === '/'}>
							<Icon name="home" /> For You
						</Menu.Item>
						<Menu.Item
							as={Link}
							to="/movies"
							active={location.pathname === '/movies'}
						>
							<Icon name="film" /> Movies
						</Menu.Item>
						<Menu.Item
							as={Link}
							to="/tv_shows"
							active={location.pathname === '/tv_shows'}
						>
							<Icon name="tv" /> TV Shows
						</Menu.Item>
						<Menu.Item
							as={Link}
							to="/books"
							active={location.pathname === '/books'}
						>
							<Icon name="book" /> Books
						</Menu.Item>
						<Menu.Item
							as={Link}
							to="/friends"
							active={location.pathname === '/friends'}
						>
							<Icon name="users" /> Friends
						</Menu.Item>
						<Menu.Item onClick={handleLogout}>
							<Icon name="sign out" /> Logout
						</Menu.Item>
					</div>
				</Menu>
			)}
		</div>
	);
}

export default Navbar;
