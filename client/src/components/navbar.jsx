import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sidebar, Icon, Header } from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive'; // allows us to use media queries in our components

// Pass in handleLogout as a prop from App.jsx
function Navbar({ handleLogout }) {
	const [sidebarVisible, setSidebarVisible] = useState(false);

	const handleSidebarHide = () => setSidebarVisible(false);
	const handleSidebarShow = () => setSidebarVisible(true);

	// find out whether the screen is mobile or not
	const isMobile = useMediaQuery({ maxWidth: 767 });

	// render appropriate header based on whether the screen is mobile or not
	return (
		<div>
			{isMobile ? (
				<>
					<Header as="h1" as={Link} to="/">
						Friend-commend
					</Header>
					<Menu.Item position="right">
						<Icon name="sidebar" onClick={handleSidebarShow} />
					</Menu.Item>
					<Sidebar
						as={Menu}
						animation="overlay"
						onHide={handleSidebarHide}
						visible={sidebarVisible}
						vertical
						width="thin"
					>
						<Menu.Item as={Link} to="/" onClick={handleSidebarHide}>
							For You
						</Menu.Item>
						<Menu.Item as={Link} to="/user" onClick={handleSidebarHide}>
							User
						</Menu.Item>
						<Menu.Item as={Link} to="/movies" onClick={handleSidebarHide}>
							Movies
						</Menu.Item>
						<Menu.Item as={Link} to="/tv_shows" onClick={handleSidebarHide}>
							TV Shows
						</Menu.Item>
						<Menu.Item as={Link} to="/books" onClick={handleSidebarHide}>
							Books
						</Menu.Item>
						<Menu.Item as={Link} to="/friends" onClick={handleSidebarHide}>
							Friends
						</Menu.Item>
						<Menu.Item onClick={handleLogout}>Logout</Menu.Item>
					</Sidebar>
				</>
			) : (
				<Menu as="nav">
					<Header as="h1" as={Link} to="/">
						Your Site Title
					</Header>
					<Menu.Item as={Link} to="/">
						For You
					</Menu.Item>
					<Menu.Item as={Link} to="/user">
						User
					</Menu.Item>
					<Menu.Item as={Link} to="/movies">
						Movies
					</Menu.Item>
					<Menu.Item as={Link} to="/tv_shows">
						TV Shows
					</Menu.Item>
					<Menu.Item as={Link} to="/books">
						Books
					</Menu.Item>
					<Menu.Item as={Link} to="/friends">
						Friends
					</Menu.Item>
					<Menu.Item onClick={handleLogout}>Logout</Menu.Item>
				</Menu>
			)}
		</div>
	);
}

export default Navbar;
