import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sidebar, Icon, Header } from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive'; // allows us to use media queries in our components

// Pass in handleLogout and  as a prop from App.jsx
function Navbar({ handleLogout, user }) {
	console.log(user);
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
					<Header as="h1">Friend-commend</Header>
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
						<Menu.Item as={Link} to="/user" onClick={handleSidebarHide}>
							<Icon name="user circle" />
							<div>
								<strong>
									{user.firstName} {user.lastName}
								</strong>
								<p>{user.userName}</p>
							</div>
						</Menu.Item>
						<Menu.Item as={Link} to="/" onClick={handleSidebarHide}>
							<Icon name="home" /> For You
						</Menu.Item>
						<Menu.Item as={Link} to="/movies" onClick={handleSidebarHide}>
							<Icon name="film" /> Movies
						</Menu.Item>
						<Menu.Item as={Link} to="/tv_shows" onClick={handleSidebarHide}>
							<Icon name="tv" /> TV Shows
						</Menu.Item>
						<Menu.Item as={Link} to="/books" onClick={handleSidebarHide}>
							<Icon name="book" /> Books
						</Menu.Item>
						<Menu.Item as={Link} to="/friends" onClick={handleSidebarHide}>
							<Icon name="users" /> Friends
						</Menu.Item>
						<Menu.Item onClick={handleLogout}>
							<Icon name="sign out" /> Logout
						</Menu.Item>
					</Sidebar>
				</>
			) : (
				<Menu as="nav">
					<Header as="h1">Friend-Commend</Header>
					<Menu.Item as={Link} to="/user">
						<Icon name="user circle" />
						<strong>
							{user.firstName} {user.lastName}
						</strong>
					</Menu.Item>
					<Menu.Item as={Link} to="/">
						<Icon name="home" /> For You
					</Menu.Item>
					<Menu.Item as={Link} to="/movies">
						<Icon name="film" /> Movies
					</Menu.Item>
					<Menu.Item as={Link} to="/tv_shows">
						<Icon name="tv" /> TV Shows
					</Menu.Item>
					<Menu.Item as={Link} to="/books">
						<Icon name="book" /> Books
					</Menu.Item>
					<Menu.Item as={Link} to="/friends">
						<Icon name="users" /> Friends
					</Menu.Item>
					<Menu.Item onClick={handleLogout}>
						<Icon name="sign out" /> Logout
					</Menu.Item>
				</Menu>
			)}
		</div>
	);
}

export default Navbar;
