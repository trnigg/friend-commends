// TODO if time - debounce (delay) search requests to avoid making a request for every keystroke
// TODO - fix query firing on every keystroke
// may need to use useCallback to memoize the search function https://react.dev/reference/react/useCallback
// Currently every key stroke is returning ALL users, not just matching search - this is not currently an issue until we have more data
// Similarly, pagination will be needed to handle large numbers of users

// https://react.semantic-ui.com/modules/search/#variations-fluid
import { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import _ from 'lodash'; // lodash allows for debouncing (delaying) of search requests and escaping special characters in regex
import { Search, Button, Icon } from 'semantic-ui-react';
import { QUERY_ALL } from '../utils/queries';
import { ACCEPT_FRIEND_REQUEST } from '../utils/mutations';

import AuthService from '../utils/auth';

import './userSearchBar.css';

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

	// TODO: Fix the following funtionality - currently buttons in search don't work because results unfocus when clicked
	const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST);

	const handleAcceptRequest = async (fromUserId, event) => {
		try {
			event.stopPropagation();
			await acceptFriendRequest({
				variables: { fromUserId, toUserId: userId },
			});
			// handle success (e.g., refetch queries, show a success message)
		} catch (error) {
			// handle error (e.g., show an error message)
		}
	};

	const handleSendRequest = async (friendId) => {
		try {
			await sendRequest({ variables: { friendId } });
			// handle success (e.g., refetch queries, show a success message)
		} catch (error) {
			// handle error (e.g., show an error message)
		}
	};

	// TODO: Move CSS to a separate file and remove inline styles
	// Configure how to render search results
	const resultRenderer = ({
		id: friendId,
		firstName,
		lastName,
		userName,
		sentFriendRequests,
		pendingFriendRequests,
		friends,
		// The following are used to determine the status of the friend request and display the appropriate button/message,
		// by checking if the user's id appears in the friends, sentFriendRequests, or pendingFriendRequests arrays of the user being searched
	}) => {
		let friendStatus;
		if (friends.some((friend) => friend.id === userId)) {
			friendStatus = 'FRIENDS';
		} else if (sentFriendRequests.some((request) => request.id === userId)) {
			friendStatus = 'REQUEST_RECEIVED';
		} else if (pendingFriendRequests.some((request) => request.id === userId)) {
			friendStatus = 'REQUEST_SENT';
		} else {
			friendStatus = 'NOT_FRIENDS';
		}

		return (
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
				{friendStatus === 'FRIENDS' ? (
					<Button disabled>
						<Icon name="user" />
						Already Friends
					</Button>
				) : friendStatus === 'REQUEST_SENT' ? (
					<Button disabled>
						<Icon name="user outline" />
						Request Sent
					</Button>
				) : friendStatus === 'REQUEST_RECEIVED' ? (
					<Button
						basic
						color="green"
						onClick={() => handleAcceptRequest(friendId)}
					>
						<Icon name="user plus" />
						Accept their Request
					</Button>
				) : (
					<Button onClick={() => handleSendRequest(friendId)}>
						<Icon name="user plus" />
						Send Friend Request
					</Button>
				)}
			</div>
		);
	};

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
