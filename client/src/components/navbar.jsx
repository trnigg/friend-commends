import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sidebar, Icon, Header } from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive'; // allows us to use media queries in our components

function Navbar() {
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
							Home
						</Menu.Item>
						<Menu.Item
							as={Link}
							to="/recommendations"
							onClick={handleSidebarHide}
						>
							Recommendations
						</Menu.Item>
						<Menu.Item as={Link} to="/indiv_shows" onClick={handleSidebarHide}>
							Individual Shows
						</Menu.Item>
						<Menu.Item as={Link} to="/overview" onClick={handleSidebarHide}>
							Overview
						</Menu.Item>
						<Menu.Item as={Link} to="/friends" onClick={handleSidebarHide}>
							Friends
						</Menu.Item>
						<Menu.Item as={Link} to="/nav_page" onClick={handleSidebarHide}>
							Nav Page
						</Menu.Item>
					</Sidebar>
				</>
			) : (
				<Menu as="nav">
					<Header as="h1" as={Link} to="/">
						Your Site Title
					</Header>
					<Menu.Item as={Link} to="/">
						Home
					</Menu.Item>
					<Menu.Item as={Link} to="/recommendations">
						Recommendations
					</Menu.Item>
					<Menu.Item as={Link} to="/indiv_shows">
						Individual Shows
					</Menu.Item>
					<Menu.Item as={Link} to="/overview">
						Overview
					</Menu.Item>
					<Menu.Item as={Link} to="/friends">
						Friends
					</Menu.Item>
					<Menu.Item as={Link} to="/nav_page">
						Nav Page
					</Menu.Item>
				</Menu>
			)}
		</div>
	);
}

export default Navbar;
