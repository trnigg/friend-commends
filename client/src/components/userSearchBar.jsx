// TODO if time - debounce (delay) search requests to avoid making a request for every keystroke
// TODO - fix query firing on every keystroke
// may need to use useCallback to memoize the search function https://react.dev/reference/react/useCallback

// https://react.semantic-ui.com/modules/search/#variations-fluid
import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import _ from 'lodash'; // lodash allows for debouncing (delaying) of search requests and escaping special characters in regex
import { Search, Button, Icon } from 'semantic-ui-react';
import { QUERY_ALL } from '../utils/queries';
import AuthService from '../utils/auth';

function UserSearchBar() {
	const { data: { _id: userId } = {} } = AuthService.getProfile();
	const [search, { data: searchData }] = useLazyQuery(QUERY_ALL);
	const [searchResults, setSearchResults] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (searchData?.users) {
			console.log(searchData.users);
			const re = new RegExp(_.escapeRegExp(searchQuery), 'i');
			const isMatch = (result) => {
				if (result.id === userId) {
					return false;
				}
				return re.test(result.firstName + ' ' + result.lastName);
			};
			setSearchResults(_.filter(searchData.users, isMatch));
			setIsLoading(false);
		}
	}, [searchData, searchQuery, userId]);

	const handleSearchChange = (e, { value }) => {
		setSearchQuery(value);
		if (value.length < 1) {
			setSearchResults([]);
			setIsLoading(false);
		} else {
			setIsLoading(true);
			search({ variables: { query: value } });
		}
	};

	// TODO : Configure conditional rendering to only display button if user is not already friends with the user
	// IF user is already friends with the user, display "Friends" instead of button
	// IF user has already sent a friend request to the user, display "Request Sent" instead of button
	// TODO : user's number of recommendations
	// TO
	const resultRenderer = ({
		firstName,
		lastName,
		userName,
		// recommendations,
		// profileImage,
	}) => (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<img
					src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
					alt={`${firstName} ${lastName}`}
					style={{
						marginRight: '10px',
						width: '50px',
						height: '50px',
						borderRadius: '50%',
					}}
				/>
				<div>
					<div>
						{firstName} {lastName}
					</div>
					<div>{userName}</div>
					<div>
						<strong>0</strong> recommendations
					</div>
				</div>
			</div>
			<Button>
				<Icon name="user plus" />
				Send Friend Request
			</Button>
		</div>
	);

	// Need to use resultRenderer function to define how to render search results
	// https://react.semantic-ui.com/modules/search/

	return (
		<Search
			fluid
			loading={isLoading}
			onSearchChange={handleSearchChange}
			results={searchResults}
			value={searchQuery}
			resultRenderer={resultRenderer}
		/>
	);
}

export default UserSearchBar;
