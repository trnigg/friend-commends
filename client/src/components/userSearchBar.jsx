// TODO if time - debounce (delay) search requests to avoid making a request for every keystroke
// TODO - fix query firing on every keystroke
// may need to use useCallback to memoize the search function https://react.dev/reference/react/useCallback
// Currently every key stroke is returning ALL users, not just matching search - this is not currently an issue until we have more data
// Similarly, pagination will be needed to handle large numbers of users

// https://react.semantic-ui.com/modules/search/#variations-fluid
import { useState, useEffect, useRef } from 'react'; // useRef is used to control the state of the search results - allows us to persist values between renders. https://www.w3schools.com/react/react_useref.asp
import { useLazyQuery, useMutation } from '@apollo/client';
import _ from 'lodash'; // lodash allows for debouncing (delaying) of search requests and escaping special characters in regex
import { Search, Button, Icon } from 'semantic-ui-react';
import { QUERY_ALL } from '../utils/queries';
import { ACCEPT_FRIEND_REQUEST, SEND_FRIEND_REQUEST } from '../utils/mutations';

import AuthService from '../utils/auth';

import './userSearchBar.css';

function UserSearchBar() {
	const { data: { _id: userId } = {} } = AuthService.getProfile();
	const [search, { data: searchData }] = useLazyQuery(QUERY_ALL);
	const [searchResults, setSearchResults] = useState([]);
	const [originalResults, setOriginalResults] = useState([]);

	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const [open, setOpen] = useState(false); // control the state of search results
	const searchRef = useRef(null); // Add this line

	// Handle clicking outside of search results to close them
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (searchData?.users) {
			const re = new RegExp(_.escapeRegExp(searchQuery), 'i');
			const isMatch = (result) => {
				if (result.id === userId) {
					return false;
				}
				return re.test(result.firstName + ' ' + result.lastName);
			};
			const filteredResults = _.filter(searchData.users, isMatch);
			setSearchResults(
				filteredResults.map((result, index) => ({
					title: result.firstName + ' ' + result.lastName,
					id: index,
				}))
			);
			setOriginalResults(filteredResults);
			setIsLoading(false);
		}
	}, [searchData, searchQuery, userId]);

	const handleSearchChange = (e, { value }) => {
		setSearchQuery(value);
		setOpen(true); // Add this line
		if (value.length < 1) {
			setSearchResults([]);
			setIsLoading(false);
		} else {
			setIsLoading(true);
			search({ variables: { query: value } });
		}
	};

	// Get the mutation functions
	const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST);
	const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST);

	// Define the handlers
	const handleAcceptRequest = (index) => {
		const { id: resultUserId } = originalResults[index];
		acceptFriendRequest({
			variables: { fromUserId: resultUserId, toUserId: userId },
		});
	};

	const handleSendRequest = (index) => {
		const { id: resultUserId } = originalResults[index];
		sendFriendRequest({
			variables: { fromUserId: userId, toUserId: resultUserId },
		});
	};

	// TODO: Move CSS to a separate file and remove inline styles
	// Configure how to render search results
	const resultRenderer = ({ id }) => {
		const {
			id: resultUserId,
			firstName,
			lastName,
			userName,
			sentFriendRequests,
			pendingFriendRequests,
			friends,
		} = originalResults[id];
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
					<Button basic color="green" onClick={() => handleAcceptRequest(id)}>
						<Icon name="user plus" />
						Accept their Request
					</Button>
				) : (
					<Button onClick={() => handleSendRequest(id)}>
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
		<div ref={searchRef}>
			<Search
				fluid
				loading={isLoading}
				onSearchChange={handleSearchChange}
				results={searchResults}
				value={searchQuery}
				open={open}
				resultRenderer={resultRenderer}
			/>
		</div>
	);
}

export default UserSearchBar;
